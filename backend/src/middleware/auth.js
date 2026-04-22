import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Please login first.'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id).select('_id name email profilePic');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

export const optionalAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await User.findById(decoded.id).select('_id name email profilePic');
            req.user = user;
        }
        next();
    } catch (error) {
        next();
    }
};
