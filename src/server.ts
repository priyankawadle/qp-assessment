import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import userRoutes from "./Routes/userRoutes";
import adminRoutes from "./Routes/adminRoutes";
import authRoutes from "./Routes/authRoutes";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();


const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Use the imported router
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Define a GET route correctly
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Welcome to Assessment!");
});

// Start listening on port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
