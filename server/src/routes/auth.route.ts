import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import prisma from '../helpers/prisma-client.helper';
import { LoginSchema, RegisterSchema } from '../schemas/auth.schema';
import { redisStore } from '../helpers/redis';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const loginValidationResult = LoginSchema.safeParse({ email, password });

  if (!loginValidationResult.success) {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }

  const dto = loginValidationResult.data;
  const user = await prisma.user.findUnique({ where: { email: dto.email } });

  if (!user) {
    return res.status(404).json({ error: 'Invalid email or password.' });
  }

  const isMatch = await bcrypt.compare(dto.password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid email or password." });
  }

  const { password: _, ...userWithoutPassword } = user; 

  const payload = { ...userWithoutPassword };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  // save on redis
  await redisStore.client.set(
    `jwt:${user.id}`,
    token,
    {
      expiration: {
        type: 'EX',
        value: 60 * 60 * 60 // 1 hour
      }
    }
  );

  return res.status(200).json({ 
    message: 'Login successful', 
    user: userWithoutPassword,
    accessToken: token
   });
});

router.post('/register', async (req, res) => {
  const dto = RegisterSchema.parse(req.body);

  const userExists = await prisma.user.findUnique({ where: { email: dto.email } });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

  const newUser = await prisma.user.create({ data: { email: dto.email, password: hashedPassword, first_name: dto.first_name, last_name: dto.last_name } });
  const { password: _, ...userWithoutPassword } = newUser;

  jwt.sign(
    { ...userWithoutPassword },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  res.status(200).json({
    message: "User registered successfully",
    user: userWithoutPassword,
  });
});

export default router;