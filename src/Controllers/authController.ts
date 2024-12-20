import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import con from "../database/index";

const SECRET_KEY = process.env.JWT_SECRET || "defaultsecretkey";

/**
 * Controller for user login
 * @param req - Express Request object containing username and password in the body
 * @param res - Express Response object
 * @returns JWT token upon successful login
 * @throws 404 if user not found, 401 if password is invalid, 500 for server errors
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Query the database for the user by username
    const [users]: any = await con.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (users.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const user = users[0];

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Controller for user registration
 * @param req - Express Request object containing username, password, and role in the body
 * @param res - Express Response object
 * @returns 201 status on successful registration
 * @throws 500 for server errors
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password, role } = req.body;

  try {
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await con.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, role]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    // Check for duplicate username error
    if (error.code === "ER_DUP_ENTRY") {
    res.status(409).json({ message: "Username already exists" });
    return;
    }
    res.status(500).json({ message: "Server error", error });
  }
};
