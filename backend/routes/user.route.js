import express from "express";
import { register, login, refresh } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", authMiddleware, refresh);

export default router;