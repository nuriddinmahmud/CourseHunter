import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import mainRoute from "./routes/index.js"; 

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

// JSON tan olish
app.use(express.json());

// CORS sozlamalari
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

// // Swagger hujjatlari uchun konfiguratsiya
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "CourseHunter(Exam) API",
    version: "1.0.0",
    description: "Documentations for Project CourseHunter (Nuriddin, Abdulboriy, Barchinoy)",

  },
  servers: [
    {
      url: `http://localhost:${PORT}/api`,
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      BearerAuth: [], // Tokenni tekshirish
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Barcha route fayllarini Swaggerda ko'rsatish
};

const swaggerSpec = swaggerJSDoc(options);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    authAction: {
      BearerAuth: {
        name: "Authorization",
        schema: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
        value: "Bearer <Your-Token-Here>"
      }
    }
  }
}));
console.log(`📄 Swagger UI yuklandi: http://localhost:${PORT}/api-docs`);

// // API route'larni ulash
app.use("/api", mainRoute);

// Token autentifikatsiyasi uchun middleware
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send({ message: "Access Denied. No Token Provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid Token" });
  }
};

// // Barcha so'rovlar uchun tokenni tekshirish
app.use(verifyToken); 

// Serverni ishga tushirish
async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully ✅");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log("Database ulanishda xatolik:", error.message);
  }
}

bootstrap();
