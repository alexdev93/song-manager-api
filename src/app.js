const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const songRoutes = require("./routes/songRoutes");
const statsRoutes = require("./routes/statsRoutes");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PATCH,DELETE,PUT",
    allowedHeaders: "Content-Type,Authorization,Range",
  })
);

app.use(express.json());

app.use("/api", songRoutes);
app.use("/api", statsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Global Error Handler
app.use(errorHandler);

// Run the update script
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
  

  const mongoose = require("mongoose");
// Note that uncaughtException is a very crude mechanism for
// dealing with errors. It is generally better to use
// try/catch blocks and handle the errors explicitly. This
// event is best used for performing some last-minute cleanup
// before the process exits. Not recommended for production
// code, but can be useful for debugging.
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // Make sure we close the database connection before exiting
  mongoose.connection.close().then(() => {
    process.exit(1);
  });
});


// In Node.js, any unhandled promise rejection will terminate the process.
// This listener allows us to log the error before exiting.
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  // Make sure we close the database connection before exiting
  mongoose.connection.close().then(() => {
    process.exit(1);
  });
});
module.exports = app;
