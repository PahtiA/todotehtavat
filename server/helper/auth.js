import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
    // tarvittaessa voit tallentaa tiedon req.user = decoded
    next();
  });
};
