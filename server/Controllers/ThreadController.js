import express from "express";
import mongoose from "mongoose";
import Thread from "../Models/Thread.js";
import User from "../Models/User.js";

export const getThreadsByForumId = async (req, res) => {

    const forumId = req.params.forumId;

    try {
        let threads = await Thread
        .findOne({ forumId: forumId })
        .populate("author", ["username", "profilePicture"]);

        const { forumId: id, posts, ...threadDetails } = threads._doc;
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
        .populate("author", ["username", "email", "rank", "reputation", "answers", "signature", "profilePicture"])
        .populate("posts");

        return res.status(200).json(thread);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

export const createThread = async (req, res) => {
    const thread = new Thread({
        forumId: req.body.forumId,
        title: req.body.title,
        description: req.body.description,
        author: req.body.authorId,
    });
    try {
        await thread.save();
        return res.status(200).json(thread);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const updateThread = async (req, res) => {
    const threadId = req.params.id;
    const userId = req.body.userId;

    try {
        // console.log(thread.title.toString(), title);
        const thread = await Thread.findByIdAndUpdate(threadId);
        if (userId === thread.authorId) {
            await thread.updateOne({ $set: req.body })
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

    const user = await User.findById(userId);
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
