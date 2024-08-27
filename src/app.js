const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const songRoutes = require("./routes/songRoutes")
const statsRoutes = require("./routes/statsRoutes");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: "*", 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// Default Route
app.get("/", (req, res) => {
  res.send("Song Manager API is running");
});

app.use("/api", songRoutes);
app.use("/api", statsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Global Error Handler
app.use(errorHandler);


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.error("Database connection failed:", e);
    process.exit(1);
  });

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

module.exports = app;
