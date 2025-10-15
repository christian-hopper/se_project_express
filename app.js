const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
require("dotenv").config();

const mainRouter = require("./routes/index");

const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

// Enable CORS
app.use(cors());

// Parse incoming JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Request logger
app.use(requestLogger);

// Routes
app.use("/", mainRouter);

// Error logger
app.use(errorLogger);

// Celebrate error handler
app.use(errors());

// Centralized error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
