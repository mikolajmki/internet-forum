import mongoose, { mongo } from "mongoose";

const notificationSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    thread: { type: mongoose.Schema.Types.ObjectId, ref: "Thread", required: false },
    forum: { type: mongoose.Schema.Types.ObjectId, ref: "Forum", required: false },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);