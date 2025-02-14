
import { Router } from "express";
import authController from "../controllers/Auth.js"

const authRouter = Router();

// POST /auth/refresh-token - получить новые tokens
authRouter.post("/", authController.refreshTokens);

export default authRouter;
