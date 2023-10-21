import Post from "../Models/Post.js";
import Thread from "../Models/Thread.js";
import Forum from "../Models/Forum.js";
import User from "../Models/User.js";

export const getVotes = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById({ _id: postId });

        return res.status(200).json(post.upvotes.length - post.downvotes.length);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}

export const votePost = async (req, res) => {
    
    const postId = req.params.id;
    const voteType = req.params.type;
    const userId = req.body.userId;

    try {
        // console.log(post.title.toString(), title);
        const post = await Post.findById({ _id: postId });

        const userUpvoted = post.upvotes.includes(userId);
        const userDownvoted = post.downvotes.includes(userId);
        
        if (userDownvoted && voteType === "0") {
            return res.status(500).json({ message: "You downvoted already." });
        } else if (userUpvoted && voteType === "1") {
            return res.status(500).json({ message: "You upvoted already." });
        } else if (!userUpvoted && !userDownvoted && voteType == "2") {
            return res.status(500).json({ message: "You cancelled already." })
        }
        

        if (voteType === "0") {
            if (userUpvoted) {
                await post.updateOne({ $pull: { upvotes: userId } });
                await post.updateOne({ $push: { downvotes: userId } });           
                await User.findByIdAndUpdate({ _id: post.author._id }, { $inc: { reputation: -2 } });

            } else if (!userDownvoted) {
                await post.updateOne({ $push: { downvotes: userId } });
                await User.findByIdAndUpdate({ _id: post.author._id }, { $inc: { reputation: -1 } });
            } else {
                return res.status(500).json({ message: "You downvoted already." })
            }

        } else if (voteType === "1") {
            if (userDownvoted) {
                await post.updateOne({ $pull: { downvotes: userId } });
                await post.updateOne({ $push: { upvotes: userId } });
                await User.findByIdAndUpdate({ _id: post.author._id }, { $inc: { reputation: 2 } });

            } else if (!userUpvoted) {
                await post.updateOne({ $push: { upvotes: userId } });
                await User.findByIdAndUpdate({ _id: post.author._id }, { $inc: { reputation: 1 } });
            }

        } else if (voteType === "2") {
            if (userDownvoted) {
                await post.updateOne({ $pull: { downvotes: userId } });
                await User.findByIdAndUpdate({ _id: post.author._id }, { $inc: { reputation: 1 } });
                
            } else if (userUpvoted) {
                await post.updateOne({ $pull: { upvotes: userId } });
                await User.findByIdAndUpdate({ _id: post.author._id }, { $inc: { reputation: -1 } });
            }
        }
        const updatedPost = await Post.findById({ _id: postId });
        return res.status(200).json({ message: "Successfully voted!", voteBalance: updatedPost.upvotes.length - updatedPost.downvotes.length });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

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

        await User.findByIdAndUpdate({ _id: req.body.authorId }, { $inc: { answers: 1 } })

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

        await Forum.findByIdAndUpdate({ _id: thread.forumId }, { $inc: { answers: -1 } });

        await User.findByIdAndUpdate({ _id: req.body.authorId }, { $inc: { answers: -1 } })

        return res.status(200).json({ message: "Post deleted." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};
