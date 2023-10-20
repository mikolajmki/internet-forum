import express from "express";
import mongoose from "mongoose";
import Post from "../Models/Post.js";
import User from "../Models/User.js";
import Thread from "../Models/Thread.js";

export const createPost = async (req, res) => {

    const threadId = req.params.threadId;

    const post = new Post({
        title: req.body.title,
        comment: req.body.comment,
        author: req.body.authorId,
    });

    try {
        const thread = await Thread.findByIdAndUpdate({ _id: threadId }, { $push: { posts: post._id } });
        await post.save();
        await thread.save();

        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

// export const updatePost = async (req, res) => {
//     const postId = req.params.id;

//     try {
//         // console.log(post.title.toString(), title);
//         const post = await Post.findByIdAndUpdate(postId);
//         await post.updateOne({ $set: req.body })
//         return res.status(200).json({ message: "Post updated!" });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: err });
//     }
// };

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const threadId = req.params.threadId;

    try {
        await Thread.findOneAndUpdate(
            { _id: threadId }, 
            { $pull: { _id: postId } }
        );

        return res.status(200).json({ message: "Post deleted." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};
