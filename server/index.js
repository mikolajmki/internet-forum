import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import UserRoutes from "./Routes/User.js" ;
import AuthRoutes from "./Routes/Auth.js";
import CategoryRoutes from "./Routes/Category.js";
import ForumRoutes from "./Routes/Forum.js";
import ThreadRoutes from "./Routes/Thread.js";
import PostRoutes from "./Routes/Post.js";
import NotificationRoutes from "./Routes/Notification.js";
import UploadRoutes from "./Routes/Upload.js";


const app = express();

app.use("/public", express.static("public"));
app.use(express.static("/images"), express.static("images"));

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }))
app.use(cors());

dotenv.config();

try {
    await mongoose.connect(process.env.MONGO_DATABASE_URL);
    app.listen(5000);
} catch (err) {
    console.log(err);
}

app.use("/user", UserRoutes);
app.use("/auth", AuthRoutes);
app.use("/category", CategoryRoutes);
app.use("/forum", ForumRoutes);
app.use("/thread", ThreadRoutes);
app.use("/post", PostRoutes);
app.use("/notification", NotificationRoutes);
app.use("/upload", UploadRoutes);