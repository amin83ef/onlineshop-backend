import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req , res) => {
    const {name , email , password } = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({ message: 'ایمیل قبلا ثبت شده است'});
            const hashedPassword = await bcrypt.hash(password , 10);
            const newUser = await User.create({
            name,
            email,
            password : hashedPassword,
        });

        res.status(201).json({
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            },
            token: generateToken(newUser._id),
        });
    } catch (error) {
        res.status(500).json({ message : 'خطا در ثبت‌نام', error: error.message})
    }
};

export const login = async (req , res) => {
    const {email , password} = req.body;
    try {
        const user = await User.findOne({ email});
        if (!user) return res.status(400).json({message : 'کاربر یافت نشد'});
        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch)
            return res.status(400).json({message : 'رمز عبور اشتباه است'});

        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({message : 'خطا در ورود', error: error.message})
    }
}

