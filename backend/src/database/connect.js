import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error.message);
  }
};

export default connectDatabase;
