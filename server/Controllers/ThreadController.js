import Thread from "../Models/Thread.js";
import Forum from "../Models/Forum.js";

export const getThreadsByForumId = async (req, res) => {

    const forumId = req.body.forumId;

    try {
        let threads = await Thread
        .findOne({ forumId: forumId })
        .populate("author", ["username", "profilePicture"]);

        const { forumId: id, ...threadDetails } = threads._doc;
        return res.status(200).json(threadDetails);
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
        .populate({ path: "author", select: ["username", "email", "rank", "reputation", "answers", "signature", "profilePicture"]})
        .populate({ path: "posts", populate: { path: "author", select: ["username", "email", "rank", "reputation", "answers", "signature", "profilePicture"] } });

        await Thread.updateOne({ _id: threadId }, { $inc: { views: 1 } });

        return res.status(200).json(thread);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

export const createThread = async (req, res) => {

    const forumId = req.body.forumId;

    const thread = new Thread({
        forumId: req.body.forumId,
        title: req.body.title,
        description: req.body.description,
        author: req.body.authorId,
    });
    try {
        await Forum.findByIdAndUpdate({ _id: forumId }, { $set: { latestThreadId: thread._id } });
        await thread.save();
        
        return res.status(200).json(thread);
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
        if (userId === thread.authorId) {
            thread.updateOne({ $set: req.body });
            console.log(thread);
            return res.status(200).json({ message: "Thread updated!" });
        }
        return res.status(403).json({ message: "Action forbidden. "});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

export const deleteThread = async (req, res) => {
    const threadId = req.params.id;
    const userId = req.body.userId;

    try {
        const thread = await thread.findById(threadId);
        if (userId === thread.authorId) {
            console.log(userId, thread.userId, thread._id)
            await thread.deleteOne();
            return res.status(200).json({ message: "Thread deleted." });
        }
        return res.status(403).json({ message: "Action forbidden." })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};
