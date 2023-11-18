import mongoose from "mongoose";

const forumSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    answers: { type: Number, default: 0 },
    latestThreadId: { type: mongoose.Schema.Types.ObjectId, ref: "Thread", required: false, default: null },
    followers: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ]
}, { timestamps: true });

export default mongoose.model("Forum", forumSchema);