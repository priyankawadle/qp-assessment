import con from '../database/index';

/**
 * Service to fetch all available grocery items
 * Grocery items are considered available if their quantity is greater than zero.
 * @returns An array of available grocery items
 */
export const getAvailableGroceryItems = async () => {
    const [rows] = await con.query(
        "SELECT * FROM grocery_items WHERE deleted_at IS NULL AND quantity > 0"
      );
      return rows;
};

/**
 * Service to book grocery items and update the inventory accordingly
 * @param items - Array of objects containing item ID and quantity to book
 * @throws Error if any item is unavailable or insufficient in quantity
 * @returns An object containing the order ID and total price of the booked items
 */
// export const bookGroceryItems = async (items: { id: number; quantity: number }[], userId: number) => {
//     const connection = await con.getConnection();
//     await connection.beginTransaction();

//     try {
//         let totalPrice = 0;
//         let [grocery]: any = '';

//         for (const item of items) {
//             // Check if the item is available
//             [grocery] = await connection.query('SELECT * FROM grocery_items WHERE id = ? AND deleted_at IS NULL', [item.id] );

//             if (grocery.length === 0 || grocery[0].quantity < item.quantity) {
//                 throw new Error(`Item with ID ${item.id} is not available or insufficient quantity`);
//             }

//             // Update inventory
//             await connection.query('UPDATE grocery_items SET quantity = quantity - ? WHERE id = ?', [
//                 item.quantity,
//                 item.id,
//             ]);

//             // Calculate total price
//             totalPrice += grocery[0].price * item.quantity;
//         }

//         // Create an order linked to the user
//         const [orderResult]: any = await connection.query('INSERT INTO orders (user_id, total_price) VALUES (?, ?)', [
//             userId,
//             totalPrice,
//         ]);

//         const orderId = orderResult.insertId;

//         // Insert each item into the order_items table
//         for (const item of items) {
//             await connection.query(
//                 'INSERT INTO order_items (order_id, grocery_id, quantity, price) VALUES (?, ?, ?, ?)',
//                 [orderId, item.id, item.quantity, item.quantity * grocery[0].price]
//             );
//         }

//         await connection.commit();

//         return { orderId, totalPrice };
//     } catch (error) {
//         await connection.rollback();
//         throw error;
//     } finally {
//         connection.release();
//     }
// };


export const bookGroceryItems = async (items: { id: number; quantity: number }[], userId: number) => {
    const connection = await con.getConnection();
    await connection.beginTransaction();

    try {
        let totalPrice = 0; // Initialize total price
        const orderItems = []; // Array to store item details for order_items insertion

        for (const item of items) {
            // Fetch grocery item details for the current item
            const [grocery]: any = await connection.query(
                'SELECT * FROM grocery_items WHERE id = ? AND deleted_at IS NULL',
                [item.id]
            );

            if (grocery.length === 0 || grocery[0].quantity < item.quantity) {
                throw new Error(`Item with ID ${item.id} is not available or has insufficient quantity`);
            }

            // Update inventory for the current item
            await connection.query(
                'UPDATE grocery_items SET quantity = quantity - ? WHERE id = ?',
                [item.quantity, item.id]
            );

            // Calculate total price for the current item and add to total
            const itemTotalPrice = grocery[0].price * item.quantity;
            totalPrice += itemTotalPrice;

            // Add current item details to the orderItems array
            orderItems.push({
                order_id: null, // Will be set after creating the order
                grocery_id: item.id,
                quantity: item.quantity,
                price: grocery[0].price * item.quantity,
            });
        }

        // Create the order linked to the user
        const [orderResult]: any = await connection.query(
            'INSERT INTO orders (user_id, total_price) VALUES (?, ?)',
            [userId, totalPrice]
        );

        const orderId = orderResult.insertId;

        // Insert all order items into the order_items table
        for (const orderItem of orderItems) {
            await connection.query(
                'INSERT INTO order_items (order_id, grocery_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, orderItem.grocery_id, orderItem.quantity, orderItem.price]
            );
        }

        await connection.commit();

        return { orderId, totalPrice };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
