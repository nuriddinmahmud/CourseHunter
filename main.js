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
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "CourseHunter(Exam) API",
    version: "1.0.0",
    description:
      "Documentations for Project CourseHunter (Nuriddin, Abdulboriy, Barchinoy)",
  },
  servers: [
    {
      url: `http://localhost:3000/api`,
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
      BearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      authAction: {
        BearerAuth: {
          name: "Authorization",
          schema: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
          },
          value: "Bearer <Your-Token-Here>",
        },
      },
    },
  })
);
console.log(`📄 Swagger UI yuklandi: http://localhost:${PORT}/api-docs`);


app.use("/api", mainRoute);
app.use("/image", express.static("./uploads"));

async function bootstrap() {
  try {
    await sequelize.sync();
    console.log("Connected to database successfully ✅");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
}

bootstrap();
