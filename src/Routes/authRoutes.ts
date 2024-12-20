import express from 'express';
import { login, register } from '../Controllers/authController';
import { validateRegister, validateLogin} from '../Middleware/validation';


const router = express.Router();
/**
 * Route to register a new user
 * Endpoint: POST /register
 * Description: Registers a new user by accepting user details such as username, password, and role.
 */
router.post('/register', validateRegister, register);

/**
 * Route to login an existing user
 * Endpoint: POST /login
 * Description: Authenticates a user by validating their credentials and returns a JWT token upon success.
 */
router.post('/login', validateLogin, login);

export default router;