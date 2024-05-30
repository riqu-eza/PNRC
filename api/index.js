import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import adminRouter from "./routes/admin.route.js";
import blogRouter from "./routes/blog.route.js";
import bookingRouter from "./routes/booking.route.js";
import inquriesRouter from "./routes/inquries.route.js";
import commentRouter from "./routes/comment.route.js";
import letterRouter from "./routes/letter.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

dotenv.config(); 

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/blog", blogRouter);
app.use("/api/admin", adminRouter);
app.use("/api/inquiries", inquriesRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/comment", commentRouter);
app.use("/api/letter", letterRouter)

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const stack = err.stack || null;
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack,
  });
});
