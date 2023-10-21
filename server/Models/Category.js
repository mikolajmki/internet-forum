import mongoose from "mongoose";
import forumSchema from "./Forum.js"

const categorySchema = mongoose.Schema({
    title: { type: String, required: true },
    forums: [ { type: mongoose.Schema.Types.ObjectId, ref: "Forum", required: false } ]
}, { timestamps: false });

export default mongoose.model("Category", categorySchema);