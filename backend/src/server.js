import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Rota de teste
app.get("/", (req, res) => {
  res.status(200).json({ message: "API do Mini-Projeto Fullstack está online 🚀" });
});

// Executa apenas localmente
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Servidor rodando localmente na porta ${PORT}`);
  });
}

export default app; // Necessário para o deploy na Vercel
