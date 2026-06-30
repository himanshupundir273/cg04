require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const dataRoutes = require("./routes/dataRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/data", dataRoutes);

app.get("/", (req, res) => {
  res.send("Server Running...");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});