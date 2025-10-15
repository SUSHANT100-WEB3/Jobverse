import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Remove trailing spaces from origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://jobverse-hpyy.onrender.com",
  "https://jobverse-gold.vercel.app/"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // for Postman, curl, etc.
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// API routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});