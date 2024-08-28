const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const songRoutes = require("./routes/songRoutes")
const statsRoutes = require("./routes/statsRoutes");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const Song = require("./models/song")
const swaggerFile = require("./swagger_output.json");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: "*", 
  methods: "GET,POST,PATCH,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
// app.use(clientRequestLogger);

// Default Route
app.get("/api", (req, res) => {
  res.send("Song Manager API is running");
});

app.use("/api", songRoutes);
app.use("/api", statsRoutes);
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Global Error Handler
app.use(errorHandler);
const mongoose = require("mongoose");

// Run the update script
connectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    });
    //  mongoose.connection.db.dropDatabase();
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
