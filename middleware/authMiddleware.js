import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'کاربر یافت نشد' });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'توکن نامعتبر است' });
    }
  } else {
    return res.status(401).json({ message: 'دسترسی غیرمجاز، توکن موجود نیست' });
  }
};
