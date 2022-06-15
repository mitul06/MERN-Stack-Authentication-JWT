import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import { router } from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// cors
app.use(cors());

// connect db
connectDB(DATABASE_URL);

// json
app.use(express.json());

// load routes
app.use("/api/auth", router);

app.listen(PORT, () => {
  console.log(`app running on http://localhost:${PORT}`);
});
