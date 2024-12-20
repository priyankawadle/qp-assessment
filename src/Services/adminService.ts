import con from '../database/index';

interface GroceryItem {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}
/**
 * Service to add a new grocery item
 * @param item - The grocery item object containing { name, price, quantity }
 * @returns The result of the insertion query
 */
export const addGroceryItem = async (item: GroceryItem) => {
  const [result] = await con.query(
    "INSERT INTO grocery_items (name, price, quantity) VALUES (?, ?, ?)",
    [item.name, item.price, item.quantity]
  );
  return result;
};

/**
 * Service to fetch all grocery items
 * @returns An array of all grocery items in the database
 */
export const getAllGroceryItems = async () => {
  const [rows] = await con.query(
    "SELECT * FROM grocery_items WHERE deleted_at IS NULL"
  );
  return rows;
};

/**
 * Service to update an existing grocery item's details
 * @param id - The ID of the grocery item to update
 * @param item - The updated grocery item object containing { name, price, quantity }
 * @returns The result of the update query
 */
export const updateGroceryItem = async (id: number, item: GroceryItem) => {
  const [result] = await con.query(
    `UPDATE grocery_items 
     SET name = ?, price = ?, quantity = ? 
     WHERE id = ? AND deleted_at IS NULL`,
    [item.name, item.price, item.quantity, id]
  );

  return result;
};

/**
 * Service to delete a grocery item from the database
 * @param id - The ID of the grocery item to delete
 * @returns The result of the delete query
 */
export const deleteGroceryItem = async (id: number) => {
  const [result] = await con.query(
    "UPDATE grocery_items SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL",
    [id]
  );
  return result;
};

/**
 * Service to manage inventory levels of grocery items
 * @param id - The ID of the grocery item to update
 * @param quantity - The new quantity for the grocery item
 * @throws Error if the item with the specified ID is not found
 * @returns The result of the inventory update query
 */
export const manageInventory = async (id: number, quantity: number) => {
  const [result] = await con.query(
    `UPDATE grocery_items 
     SET quantity = ? 
     WHERE id = ? AND deleted_at IS NULL`,
    [quantity, id]
  );

  if ((result as any).affectedRows === 0) {
    throw new Error(`Item with ID ${id} not found or already deleted`);
  }

  return result;
};
