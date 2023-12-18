import mongoose from "mongoose";

const threadSchema = mongoose.Schema({
    forumId: { type: mongoose.Schema.Types.ObjectId, ref: "Forum" },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    views: { type: Number, default: 0 },
    posts: [ { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: false } ],
    followers: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ],
    images: [ { type: String, required: false } ],
    isClosed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Thread", threadSchema);

// What do you think about Jetta being the best car in the world? Let me know in the comments.