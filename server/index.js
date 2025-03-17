const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const router = require("./routes/route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: "http://localhost:5173", // Explicitly allow frontend origin
  credentials: true, // Allow cookies and authentication headers
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is listening on PORT : ${port}`);
});