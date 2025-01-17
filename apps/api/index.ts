import express from "express";
import { PrismaClient } from "@prisma/client";
import router from "./routes/userRoutes";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config(); // Load environment variables

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use("/api/users", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Removed the redundant registration route

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
