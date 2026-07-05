import 'dotenv/config';
import express from 'express';
import { z, ZodError } from 'zod';

import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('hello word')
})

app.use(express.json());
app.get('/api', (_, res) => res.send('API running...'));

// route
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use((err: any, _: any, res: any, next: any) => {
  if (err instanceof ZodError) {
    const message = z.treeifyError(err) as any;
    return next(message.properties)
  }
  return res.status(500).json({ error: 'Internal Server Error' });
})

app.listen(port, () => {
  console.log(`Start server with http://localhost:${port}`)
})

