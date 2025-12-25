const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

/**
 * 1. Global middleware
 */
app.use(express.json());
app.use(logger);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * 2. Routes
 */
app.use("/api/v1/", require("./routes/authRoute"));
app.use("/api/v1/karyawan", require("./routes/karyawanRoute"));

/**
 * 3. Error handler (PALING AKHIR)
 */
app.use(errorHandler);

module.exports = app;
