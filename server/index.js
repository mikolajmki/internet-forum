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


const app = express();

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }))
app.use(cors());

dotenv.config();

try {
    await mongoose.connect("mongodb://localhost:27017/forum");
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
