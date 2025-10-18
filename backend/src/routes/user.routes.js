import express from "express";
import { register, login } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

/**
 * Rota de cadastro
 */
router.post("/register", register);

/**
 * Rota de login
 */
router.post("/login", login);

/**
 * Rota protegida — requer token JWT
 */
router.get("/protected", verifyToken, (req, res) => {
  console.log("🔒 [PROTECTED] Rota acessada com token válido!");
  res.status(200).json({ message: "Acesso autorizado!" });
});

export default router;