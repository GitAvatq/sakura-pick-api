import { Router } from "express";
import authRouter from "../modules/auth/auth.route";
import loginRouter from "../modules/login/login.router";
import { corsConfig } from "../config/corsConfig";
const router = Router();

router.use("/auth", authRouter);
router.use("/auth", loginRouter);

export default router;
