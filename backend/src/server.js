const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const googleRoutes = require("./routes/googleRoutes");

const app = express();
//app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const server = http.createServer(app);
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use(passport.initialize());

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
app.use("/api/google", googleRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log("Server is running at 5000");
});
