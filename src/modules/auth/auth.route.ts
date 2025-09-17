import { Router } from "express";
import authControllers from "./auth.controllers";
import { authMiddleware } from "./auth.middleware";

const router = Router();

router.post("/register", authControllers.registerAsync);
router.get("/me", authMiddleware, authControllers.getMe);

export default router;
