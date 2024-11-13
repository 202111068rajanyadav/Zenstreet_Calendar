const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const eventRoute = require("./routes/eventRoute");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/zenstreet", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database connection successful"))
.catch(err => console.log("Database connection failed:", err));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// Routes
app.use("/api/events", eventRoute);

// Start server on port 8888
const PORT = 8888;
app.listen(PORT, () => console.log(`Backend server is running on port: ${PORT}`));