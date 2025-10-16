import { createUser, findUserByEmail } from "../services/user.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// --- Registrar usuário ---
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Preencha todos os campos obrigatórios." });

    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return res.status(422).json({ message: "E-mail já cadastrado." });

    await createUser(name, email, password);
    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário.", error: error.message });
  }
};

// --- Login de usuário ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Senha incorreta." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar login.", error: error.message });
  }
};
