import express from 'express';

import prisma from '../helpers/prisma-client.helper';
import authenticateToken from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authenticateToken, async (_, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default router;