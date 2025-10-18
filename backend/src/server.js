import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

// ✅ Rota de verificação (a Vercel usará isso no domínio principal)
app.get("/", (req, res) => {
  res.status(200).json({ message: "API do Mini-Projeto Fullstack está online 🚀" });
});

// ✅ Exporta o app — exigência da Vercel para funções serverless
export default app;
