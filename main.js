import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import mainRouter from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT || 7777;

const app = express();

app.use(express.json());
app.use("/api", mainRouter);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

async function bootstrap() {
  try {
    await sequelize.sync();
    console.log("Connected to database successfully ✅");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
}

bootstrap();