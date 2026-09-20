import express from 'express';
import { z, ZodError } from 'zod';
import cors from 'cors';

import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import workspaceRouter from './routes/workspace.route.js';
import workspaceMemberRouter from './routes/workspace-member.route.js';
import boardRouter from './routes/board.route.js';
import listRouter from './routes/list.route.js';
import cardRouter from './routes/card.route.js';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('hello word')
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/api', (_, res) => res.send('API running...'));

// route
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/workspaces', workspaceRouter)
// app.use('/api/workspaces/:workspaceId/boards', boardRouter)
app.use('/api/workspace-members', workspaceMemberRouter)
app.use('/api/boards', boardRouter)
app.use('/api/lists', listRouter)
app.use('/api/cards', cardRouter)

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

