import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    
    // Validações (nome, e-mail, senha)...
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verifica se todos os campos obrigatórios foram enviados
if (!name || !email || !password) {
  return res.status(400).json({
    message: "Requisição mal formatada! Campos obrigatórios ausentes."
  });
}

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "E-mail inválido" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Senha inválida." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail repetido" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Cadastro bem-sucedido!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor." });
  }
};

// ---------------------------------------------

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

 if ( !email || !password) {
  return res.status(400).json({
    message: "Requisição mal formatada! Campos obrigatórios ausentes."
  });
}

    if (!user) {
      return res.status(404).json({ message: "E-mail inválido." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Senha inválida." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor." });
  }
};
