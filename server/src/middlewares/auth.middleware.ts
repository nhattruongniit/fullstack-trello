import jwt from 'jsonwebtoken';

const authenticateToken = (req: any, res: any, next: any) => {
  const authorization = req.headers['authorization'];
  const [prefix, token] = authorization ? authorization.split(' ') : [null, null];

  if (prefix !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Access denied.' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET  as string);
    next(); 
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export default authenticateToken;