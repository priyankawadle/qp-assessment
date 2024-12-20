import { createPool, Pool } from 'mysql2/promise'; // Use mysql2 for async/await support
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Create a connection pool
const con: Pool = createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 10, // Limit the number of connections in the pool
});

// Test the connection pool
(async () => {
    try {
        const connection = await con.getConnection();
        console.log('Connection to MySQL database pool established successfully');
        connection.release(); // Release the connection back to the pool
    } catch (error) {
        console.error('Error occurred while connecting to the database:',error);
        process.exit(1);
    }
})();

// Export the pool for use in other modules
export default con;
