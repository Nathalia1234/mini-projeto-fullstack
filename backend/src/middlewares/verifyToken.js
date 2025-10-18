import jwt from "jsonwebtoken";

/**
 * Middleware para verificar o token JWT
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    console.warn("⚠️ [AUTH] Cabeçalho de autorização ausente.");
    return res.status(401).json({ message: "Token ausente." });
  }

  const token = authHeader.split(" ")[1]; // Formato: Bearer <token>
  if (!token) {
    console.warn("⚠️ [AUTH] Token não encontrado no cabeçalho.");
    return res.status(401).json({ message: "Token ausente." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log("✅ [AUTH] Token válido — acesso autorizado.");
    next();
  } catch (error) {
    console.error(`❌ [AUTH] Token inválido: ${error.message}`);
    res.status(403).json({ message: "Token inválido." });
  }
};
