import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

// ✅ Rota de verificação (a Vercel usará isso no domínio principal)
app.get("/", (req, res) => {
  res.status(200).json({ message: "API do Mini-Projeto Fullstack está online 🚀" });
});

// ❌ Não foi usado o app.listen() na Vercel
// Em vez disso, foi exportado o app para ser tratado como função serverless

export default app;
