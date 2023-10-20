import mongoose from "mongoose";
import forumSchema from "./Forum.js"

const categorySchema = mongoose.Schema({
    title: { type: String, required: true },
}, { timestamps: false });

export default mongoose.model("Category", categorySchema);