import express from "express";
import userRouter from "./routes/userRoutes";
import eventRouter from "./routes/eventRoute";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);

app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
