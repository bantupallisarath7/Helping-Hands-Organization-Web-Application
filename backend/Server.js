import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotEnv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoutes.js";
import donationReceiptRoutes from "./Routes/donationReceiptRoutes.js";
import campaignRoutes from "./Routes/campaignRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js"
import feedbackRoutes from "./Routes/feedbackRoutes.js"


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
dotEnv.config();
app.use(cookieParser())

const port = 8815;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Mongodb connected successfully"))
    .catch((err) => console.log(err))

app.use("/auth", userRoutes);
app.use("/receipt", donationReceiptRoutes)
app.use("/campaign", campaignRoutes)
app.use("/admin", adminRoutes)
app.use("/feedback", feedbackRoutes)
app.use("/uploads", express.static("uploads"));



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

