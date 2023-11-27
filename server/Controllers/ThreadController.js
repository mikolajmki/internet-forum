import Thread from "../Models/Thread.js";
import Forum from "../Models/Forum.js";
import Notification from "../Models/Notification.js";
import { createNotificationsOfType } from "./NotificationController.js";


export const getAllThreadsWithPosts = async (req, res) => {

    const limit = req.params.limit;

    try {
        let threads = await Thread
        .find({})
        .sort("-createdAt")
        .populate({ path: "posts", populate: { path: "author", select: ["username", "email", "rank", "reputation", "answers", "signature", "profilePicture", "createdAt"] } })
        .populate("author", ["username", "profilePicture", "createdAt"])
        .populate("forumId", ["name"]);
        
  
        return res.status(200).json(threads);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

export const getThreadsByLimit = async (req, res) => {

    const limit = req.params.limit;

    try {
        let threads = await Thread
        .find({})
        .sort("-createdAt")
        .limit(limit)
        .populate("author", ["username", "profilePicture", "createdAt"])
        .populate("forumId", ["name"]);
  
        return res.status(200).json(threads);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

export const getThreadsByAuthorId = async (req, res) => {

    const authorId = req.params.authorId;

    try {
        let threads = await Thread
        .find({ author: authorId })
        .populate("forumId", ["name"]);
  
        return res.status(200).json(threads);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

export const getThreadsByForumId = async (req, res) => {

    const forumId = req.params.forumId;

    try {
        let threads = await Thread
        .find({ forumId: forumId })
        .populate("forumId", ["name"])
        .populate("author", ["username", "createdAt", "profilePicture"])
        .populate({ path: "posts", populate: { path: "author", select: ["username", "email", "rank", "reputation", "answers", "signature", "profilePicture", "createdAt"] } });
  
        return res.status(200).json(threads);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

export const getThreadWithPostsById = async (req, res) => {

    const threadId = req.params.id;

    try {
        let thread = await Thread
        .findById(threadId)
        .populate({ path: "author", select: ["username", "email", "rank", "reputation", "answers", "signature", "profilePicture", "createdAt"]})
        .populate({ path: "forumId", select: ["name"] })
        .populate({ path: "posts", populate: { path: "author", select: ["username", "email", "rank", "reputation", "answers", "signature", "profilePicture", "createdAt"] } });

        await Thread.updateOne({ _id: threadId }, { $inc: { views: 1 } });

        return res.status(200).json(thread);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

export const followThread = async (req, res) => {

    const threadId = req.params.id;
    const type = req.params.type;
    const userId = req.body.userId;

    try {
        const thread = await Thread.findById(threadId)

        if (thread.author.toString() === userId) {
            return res.status(403).json({ message: "Can not follow own thread." })
        }

        if (type === "0" && thread.followers.includes(userId)) {
            // unfollow
            await thread.updateOne({ $pull: { followers: req.body.userId } });
        } else if (type === "1" && !thread.followers.includes(userId)) {
            // follow
            await thread.updateOne({ $push: { followers: req.body.userId } });
        } else {
            return res.status(403).json({ message: "Forbidden action." })
        }
        
        return res.status(200).json({ message: "Thread followed!" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const createThread = async (req, res) => {

    const forumId = req.body.forumId;
    const authorId = req.body.userId;

    const thread = new Thread({
        forumId: req.body.forumId,
        title: req.body.title,
        description: req.body.description,
        author: authorId,
    });
    try {
        const forum = await Forum.findByIdAndUpdate({ _id: forumId }, { $set: { latestThreadId: thread._id } });
        await forum.updateOne({ latestThreadId: thread._id });
        await thread.save();
        
        const resultThread = await thread
        .populate("author forumId", ["username", "profilePicture", "createdAt", "name"])

        // thread notifications

        if (forum.followers.length > 0) await Notification.insertMany(createNotificationsOfType("forum", { ...forum._doc, threadId: thread._id }, authorId));
        
        return res.status(200).json(resultThread);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};

export const updateThread = async (req, res) => {
    const threadId = req.params.id;
    const userId = req.body.userId;

    try {
        // console.log(thread.title.toString(), title);
        const thread = await Thread.findById(threadId);
        if (userId === thread.authorId.toString()) {
            const resultThread = await thread.updateOne({ $set: req.body });
            console.log(thread);
            return res.status(200).json(resultThread);
        }
        return res.status(403).json({ message: "Action forbidden. "});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

export const deleteThread = async (req, res) => {
    const threadId = req.params.id;

    try {
        const thread = await Thread.findById(threadId);

        await Notification.deleteMany({ thread: thread._id });

        console.log(thread.posts.length)
        if (thread.posts.length === 0) {

            console.log(thread._id)
            const resultThread = await thread.deleteOne();

            const latestThread = await Thread.find({ forumId: thread.forumId }).sort("-createdAt").limit(1);

            console.log(latestThread[0]._id)
    
            await Forum.findByIdAndUpdate({ _id: thread.forumId }, { $set: { latestThreadId: latestThread[0]._id } })

            return res.status(200).json({ threadId: resultThread._id });
        }
        return res.status(403).json({ message: "Action forbidden. Threads of " + thread.posts.length + " remaining." })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};
