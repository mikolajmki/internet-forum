import mongoose from "mongoose";

const threadSchema = mongoose.Schema({
    forumId: { type: mongoose.Schema.Types.ObjectId, ref: "Forum" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    views: { type: Number, default: 0 },
    posts: [ { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: false } ]
}, { timestamps: true });

export default mongoose.model("Thread", threadSchema);