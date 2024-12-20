import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'defaultsecretkey';

// Middleware to verify JWT and extract user role
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(403).json({ message: 'No token provided' });
        return; // Ensure the function stops here
    }

    try {
        const decoded: any = jwt.verify(token, SECRET_KEY);
        (req as any).user = decoded; // Attach user to request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Middleware to check admin role
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (user?.role !== 'admin') {
        res.status(403).json({ message: 'Access denied: Admins only' });
        return;
    }
    next();
};

// Middleware to check if the user is a regular user;
export const isUser = (req: Request, res: Response, next: NextFunction): void => {
    if ((req as any).user.role !== 'user') {
        res.status(403).json({ message: 'Access denied: Users only' });
        return;
    }
    next();
};