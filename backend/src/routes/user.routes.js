import express from "express";
import { register, login } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Acesso autorizado!" });
});

export default router;
