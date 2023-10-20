import Post from "../Models/Post.js";
import Thread from "../Models/Thread.js";
import Forum from "../Models/Forum.js";

export const createPost = async (req, res) => {

    const threadId = req.body.threadId;

    const post = new Post({
        title: req.body.title,
        comment: req.body.comment,
        author: req.body.authorId,
    });

    try {
        const thread = await Thread.findByIdAndUpdate({ _id: threadId }, { $push: { posts: post._id } });
        
        await Forum.findByIdAndUpdate({ _id: thread.forumId }, { $inc: { answers: 1 } });

        await post.save();

        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const updatePost = async (req, res) => {
    const postId = req.params.id;

    try {
        // console.log(post.title.toString(), title);
        await Post.findByIdAndUpdate({ _id: postId }, { $set: req.body });
        
        return res.status(200).json({ message: "Post updated!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const threadId = req.params.threadId;

    try {
        const thread = await Thread.findOneAndUpdate(
            { _id: threadId }, 
            { $pull: { _id: postId } }
        );

        await Post.findOneAndDelete({ _id: postId });

        await Forum.findByIdAndUpdate({ _id: thread.forumId }, { $dec: { answers: 1 } });

        return res.status(200).json({ message: "Post deleted." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};
