import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configuration/connectDB.js";
connectDB();
import cookieParser from "cookie-parser";
import cors from "cors";
const PORT = process.env.PORT;
import userRoute from "./routes/userRoute.js";

// Middleware to parse JSON request body
app.use(express.json()); // express.json() converts incoming JSON data into a JavaScript object. It expects the incoming request to have a JSON body.

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/v1/user", userRoute);

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}`);
});
