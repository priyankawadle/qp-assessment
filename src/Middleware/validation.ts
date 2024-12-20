import { Request, Response, NextFunction } from 'express';
import con from '../database/index';

/**
 * Middleware to validate user registration input
 * - Username should not contain numbers
 * - Password should be between 8 and 16 characters
 */
export const validateRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;

    const [users]: any = await con.query('SELECT * FROM users WHERE username = ?', [username]);

    if (users.length > 0) {
        res.status(409).json({ message: 'Username already exists' });
        return;
    }
    // Validate username: Should not contain numbers
    if (/\d/.test(username)) {
        res.status(400).json({ message: 'Username should not contain numbers' });
        return;
    }

    // Validate password: Minimum length 8, maximum length 16
    if (password.length < 8 || password.length > 16) {
        res.status(400).json({ message: 'Password should be between 8 and 16 characters' });
        return;
    }

    // If validation passes, proceed to the next middleware/controller
    next();
};

/**
 * Middleware to validate user login input
 * - Username must be a non-empty string
 * - Password must be a non-empty string
 */
export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
    const { username, password } = req.body;

    // Validate username
    if (!username || typeof username !== 'string') {
        res.status(400).json({ message: 'Username is required and must be a string' });
        return;
    }

    // Validate password
    if (!password || typeof password !== 'string') {
        res.status(400).json({ message: 'Password is required and must be a string' });
        return;
    }

    // If validation passes, proceed to the next middleware/controller
    next();
};