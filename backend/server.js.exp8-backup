require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const hotelRoutes = require("./routes/hotelRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
  })
);

app.use(express.json({ limit: "10kb" }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    message: "Too many requests. Please try again later."
  }
});

app.use(apiLimiter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hotel Room Booking API is Running"
  });
});

// Experiment 4: Existing hotel CRUD API
app.use("/api/hotels", hotelRoutes);

// Experiment 5: Secure user authentication API
app.use("/api/users", userRoutes);

// Handle requests to unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Centralized error handler
app.use((error, req, res, next) => {
  console.error("Request error:", error.message);

  if (res.headersSent) {
    return next(error);
  }

  res.status(error.status || 500).json({
    message:
      error.status && error.status < 500
        ? error.message
        : "Internal server error"
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not configured");
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters");
  }

  await mongoose.connect(process.env.MONGO_URI);

  console.log("MongoDB Connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exit(1);
});
