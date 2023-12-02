import Post from "../Models/Post.js";
import Thread from "../Models/Thread.js";
import Forum from "../Models/Forum.js";
import User from "../Models/User.js";
import Notification from "../Models/Notification.js";
import { createNotificationsOfType } from "./NotificationController.js";

export const getPostsByLimit = async (req, res) => {

    const limit = req.params.limit;

    try {
        let posts = await Post
        .find({}, "-upvotes -downvotes")
        .sort("-createdAt")
        .limit(limit)
        .populate("author", ["username", "profilePicture"]);

        const threads = await Thread.find({ posts: { $in: posts } }, ["_id", "title", "posts"]);
        // const threads = await Thread.aggregate([{ $match: { posts: { $in: posts } } }]);

        const results = posts.map((postDoc, i) => {
            let post = postDoc._doc;
            
            let thread = threads.filter((threadDoc, i) => {
                let thread = threadDoc._doc;
                if (thread.posts.includes(post._id)) return thread;
            })

            return { postId: post._id, threadId: thread[0]._doc._id, ...post, ...thread[0]._doc }
        })

        // const results = posts.map((post, i) => {
        //     return { threadId: threads[i]._doc._id, postId: post._doc._id, title: threads[i]._doc.title, ...post._doc };
        // });
  
        return res.status(200).json(results);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

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
        return res.status(200).json({ message: "Successfully voted!", postId: postId, upvotes: updatedPost.upvotes, downvotes: updatedPost.downvotes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

export const createPost = async (req, res) => {

    const threadId = req.body.threadId;
    const authorId = req.body.userId;

    const post = new Post({
        title: req.body.title,
        comment: req.body.comment,
        author: authorId,
    });

    try {
        const thread = await Thread
        .findByIdAndUpdate({ _id: threadId }, { $push: { posts: post._id } });

        if (thread.isClosed) {
            return res.status(403).json({ message: "Thread closed." })
        }

        const resultPost = await post.populate("author");
        await post.save();

        const forum = await Forum.findByIdAndUpdate({ _id: thread.forumId }, { $inc: { answers: 1 } });

        await User.findByIdAndUpdate({ _id: authorId }, { $inc: { answers: 1 } })
        
        if (authorId !== thread.author.toString()) await Notification.insertMany(createNotificationsOfType("thread-author", thread, authorId));
        
        if (thread.followers.length > 0) await Notification.insertMany(createNotificationsOfType("thread", thread, authorId));

        return res.status(200).json(resultPost);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const updatePost = async (req, res) => {
    const postId = req.params.id;

    try {
        // console.log(post.title.toString(), title);
        const post = await Post.findByIdAndUpdate({ _id: postId }, { $set: req.body });
        
        return res.status(200).json({ post });
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
            { $pull: { posts: postId } }
        );

        const post = await Post.findOneAndDelete({ _id: postId });

        await Notification.deleteMany({ type: { $in: [ "thread-author", "thread" ] }, thread: threadId });

        await Forum.findByIdAndUpdate({ _id: thread.forumId }, { $inc: { answers: -1 } });

        await User.findByIdAndUpdate({ _id: post.author._id }, { $inc: { answers: -1 } })

        return res.status(200).json({ postId: postId });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};
