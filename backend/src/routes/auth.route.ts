import express from "express";
import { registerHandler } from "../controllers/auth.controller";

const authRoutes = express.Router();

// prefix is `/auth`

authRoutes.post('/register', registerHandler);
// authRoutes.post('/login', loginHandler);
// authRoutes.post('/refresh', refreshHandler);
// authRoutes.get('/email/verify/:code', verifyEmailHandler);
// authRoutes.post('/password/forgot', forgotPasswordHandler);
// authRoutes.post('/password/reset', resetPasswordHandler);

export default authRoutes;
