import express from 'express';
import { verifyToken, isUser } from '../Middleware/authMiddleware';
import { getGroceryItems, bookItems } from '../Controllers/userController';

const router = express.Router();

/**
 * Route to get all available grocery items
 * Requires user authentication
 * Endpoint: GET /grocery
 */
router.get('/grocery', verifyToken, isUser, getGroceryItems);

/**
 * Route to book grocery items in a single order
 * Requires user authentication
 * Endpoint: POST /order
 */
router.post('/order', verifyToken, isUser, bookItems);

export default router;