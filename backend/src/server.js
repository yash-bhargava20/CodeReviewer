const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();

const app = express();
//app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const server = http.createServer(app);
app.use(express.json());
app.use(express.static("public"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("message", err));

app.use("/api/auth", authRoutes);
app.use("/api/ai", reviewRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log("Server is running at 5000");
});
