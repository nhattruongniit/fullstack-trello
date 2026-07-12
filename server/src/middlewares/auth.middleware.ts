import jwt from 'jsonwebtoken';
import { redisStore } from '../helpers/redis';

const authenticateToken = async (req: any, res: any, next: any) => {
  const authorization = req.headers['authorization'];
  const [prefix, token] = authorization ? authorization.split(' ') : [null, null];

  if (prefix !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Access denied.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET  as string) as any;
    const storedToken = await redisStore.client.get(`jwt:${payload.id}`);
    if (!storedToken) {
      throw new Error('Token does not exist in Redis.'); // Token does not exist in Redis
    }

    next();
  } catch (err) {
    console.log('Error verifying token:', err);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export default authenticateToken;