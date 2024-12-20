import { Request, Response } from 'express';
import { addGroceryItem, getAllGroceryItems, updateGroceryItem, deleteGroceryItem, manageInventory } from '../Services/adminService';

/**
 * Controller to add a new grocery item
 * @param req - Express Request object (expects { name, price, quantity } in the body)
 * @param res - Express Response object
 */
export const createGroceryItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const result: any = await addGroceryItem(req.body);

        if (!result.insertId) {
            res.status(400).json({
                code: 400,
                message: 'Failed to add grocery item',
                data: null,
            });
            return;
        }

        res.status(201).json({
            code: 201,
            message: 'Item added successfully',
            data: {
                id: result.insertId,
                ...req.body,
            },
        });
    } catch (error: any) {
        res.status(500).json({
            code: 500,
            message: 'Error adding item',
            error: error.message,
        });
    }
};


/**
 * Controller to fetch all grocery items
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const getGroceryItems = async (_req: Request, res: Response) => {
    try {
        const items = await getAllGroceryItems();

        res.status(200).json({
            code: 200,
            message: 'Grocery items fetched successfully',
            data: items,
        });
    } catch (error: any) {
        res.status(500).json({
            code: 500,
            message: 'Error fetching items',
            error: error.message,
        });
    }
};


/**
 * Controller to update an existing grocery item's details
 * @param req - Express Request object (expects { name, price, quantity } in the body and id in the params)
 * @param res - Express Response object
 */
export const modifyGroceryItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const updateData = req.body;
        const result: any = await updateGroceryItem(id,updateData);
        if (result.affectedRows === 0) {
            res.status(404).json({
                code: 404,
                message: 'Item not found',
                data: null,
            });
            return;
        }

        res.status(200).json({
            code: 200,
            message: 'Item updated successfully',
            data: { id, ...updateData },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
    }
};

/**
 * Controller to remove a grocery item
 * @param req - Express Request object (expects id in the params)
 * @param res - Express Response object
 */
export const removeGroceryItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const result: any = await deleteGroceryItem(id);

        if (result.affectedRows === 0) {
            res.status(404).json({
                code: 404,
                message: 'Item not found or already deleted',
                data: null,
            });
            return;
        }

        res.status(200).json({
            code: 200,
            message: 'Item deleted successfully',
            data: { id },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
};

/**
 * Controller to manage inventory levels of grocery items
 * @param req - Express Request object (expects { id, quantity } in the body)
 * @param res - Express Response object
 */
export const updateInventory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, quantity } = req.body;
        const result: any = await manageInventory(id, quantity);

        if (result.affectedRows === 0) {
            res.status(404).json({
                code: 404,
                message: 'Item not found or already deleted',
                data: null,
            });
            return;
        }

        res.status(200).json({
            code: 200,
            message: 'Inventory updated successfully',
            data: { id, quantity },
        });
    } catch (error: any) {
        res.status(500).json({
            code: 500,
            message: 'Error updating inventory',
            error: error.message,
        });
    }
};
