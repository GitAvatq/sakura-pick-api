import { Router } from "express";
import loginControllers from "./login.controllers";

const router = Router();

router.post("/login", loginControllers.loginAsync);

export default router;
