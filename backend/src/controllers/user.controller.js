import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * REGISTRO DE USUÁRIO
 */
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(`📩 [REGISTER] Requisição recebida → email: ${email}`);

  try {
    // Validações de entrada
    if (!name || !email || !password) {
      console.warn("⚠️ [REGISTER] Requisição mal formatada — campos ausentes.");
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn(`⚠️ [REGISTER] E-mail inválido: ${email}`);
      return res.status(400).json({ message: "E-mail inválido." });
    }

    if (password.length < 6) {
      console.warn("⚠️ [REGISTER] Senha com tamanho inválido.");
      return res.status(400).json({ message: "Senha inválida (mínimo 6 caracteres)." });
    }

    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn(`⚠️ [REGISTER] E-mail já cadastrado: ${email}`);
      return res.status(400).json({ message: "E-mail repetido." });
    }

    // Cria o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log(`✅ [REGISTER] Usuário criado com sucesso → ${email}`);
    res.status(201).json({ message: "Cadastro bem-sucedido!" });
  } catch (error) {
    console.error(`❌ [REGISTER] Erro no servidor: ${error.message}`);
    res.status(500).json({ message: "Erro no servidor." });
  }
};

/**
 * LOGIN DE USUÁRIO
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(`📥 [LOGIN] Tentativa de login → ${email}`);

  try {
    // Validação de campos
    if (!email || !password) {
      console.warn("⚠️ [LOGIN] Requisição mal formatada — campos ausentes.");
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      console.warn(`⚠️ [LOGIN] E-mail não encontrado → ${email}`);
      return res.status(404).json({ message: "E-mail inválido." });
    }

    // Compara a senha informada com a senha salva (hash)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn(`⚠️ [LOGIN] Senha incorreta para o e-mail → ${email}`);
      return res.status(401).json({ message: "Senha inválida." });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(`✅ [LOGIN] Login bem-sucedido → ${email}`);
    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    console.error(`❌ [LOGIN] Erro no servidor: ${error.message}`);
    res.status(500).json({ message: "Erro no servidor." });
  }
};
