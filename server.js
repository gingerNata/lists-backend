import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import router from "./routes/todo.js";

config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.use('/api/todos', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});