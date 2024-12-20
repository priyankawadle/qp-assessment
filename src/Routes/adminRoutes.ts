import express, { Request, Response, Router } from "express";
import { verifyToken, isAdmin } from '../Middleware/authMiddleware';
import { createGroceryItem, getGroceryItems, modifyGroceryItem, removeGroceryItem,updateInventory } from '../Controllers/adminController';

const router: Router = express.Router();

/**
 * Add new grocery items to the system
 * Requires admin authentication
 * Endpoint: POST /grocery
 */
router.post('/grocery', verifyToken, isAdmin, createGroceryItem);

/**
 * View existing grocery items
 * Requires admin authentication
 * Endpoint: GET /grocery
 */
router.get('/grocery',  verifyToken, isAdmin,getGroceryItems);

/**
 * Update details of an existing grocery item
 * Requires admin authentication
 * Endpoint: PUT /grocery/:id
 */
router.put('/grocery/:id', verifyToken, isAdmin, modifyGroceryItem);

/**
 * Remove grocery items from the system
 * Requires admin authentication
 * Endpoint: DELETE /grocery/:id
 */
router.delete('/grocery/:id', verifyToken, isAdmin, removeGroceryItem);
/**
 * Manage inventory levels of grocery items
 * Requires admin authentication
 * Endpoint: PATCH /grocery/inventory
 */
router.patch('/grocery/inventory', verifyToken, isAdmin, updateInventory);


export default router;
