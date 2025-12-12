import express from 'express';
import { createUser, loginUser, userLoggedIn } from '../controllers/authenticationController.js';
import protectRoutes from "../middleware/protectedMiddleware.js";

const router = express.Router();

// Esta es la ruta que tu frontend va a usar
router.post('/register', createUser);

router.post('/login', loginUser);

router.get("/userloggedin", protectRoutes, userLoggedIn);


export default router;