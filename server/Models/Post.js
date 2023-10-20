import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: { type: String, required: true },
    upvotes: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ],
    downvotes: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ],
}, { timestamps: true });

export default mongoose.model("Post", postSchema);