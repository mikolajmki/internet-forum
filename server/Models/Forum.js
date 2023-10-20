import mongoose from "mongoose";

const forumSchema = mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    name: { type: String, required: true },
    description: { type: String },
    answers: { type: Number, default: 0 },
    latestThreadId: { type: mongoose.Schema.Types.ObjectId, ref: "Thread", required: false }
}, { timestamps: true });

export default mongoose.model("Forum", forumSchema);