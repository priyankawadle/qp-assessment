import { Request, Response } from "express";
import {
  getAvailableGroceryItems,
  bookGroceryItems,
} from "../Services/userService";

/**
 * Controller to fetch a list of available grocery items
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns A JSON response containing an array of available grocery items
 * @throws 500 if an error occurs while fetching the items
 */
export const getGroceryItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const items = await getAvailableGroceryItems();
    res.status(200).json({
      code: 200,
      message: "Grocery items fetched successfully",
      data: items,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: "Error fetching items",
      error: error.message,
    });
  }
};

/**
 * Controller to book grocery items in a single order
 * @param req - Express Request object containing an array of items in the body
 * @param res - Express Response object
 * @returns A JSON response with order details including order ID and total price
 * @throws 500 if an error occurs while placing the order
 */
export const bookItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body; // Items should be an array of { id, quantity }
    const userId = (req as any).user.id;
    const orderDetails = await bookGroceryItems(items, userId);

    res.status(201).json({
      code: 201,
      message: "Order placed successfully",
      data: orderDetails,
    });
  } catch (error: any) {
    console.error("Error placing order:", error); // Log the error for debugging
    res.status(500).json({
      code: 500,
      message: "Error placing order",
      data: error.message || "Internal Server Error", // Provide meaningful error data
    });
  }
};
