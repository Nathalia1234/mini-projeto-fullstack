import express from "express";
import cors from "cors";
import connectDatabase from "./database/connect.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDatabase();
app.use("/api", userRoutes);

export default app;
