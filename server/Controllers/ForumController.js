import express from "express";
import mongoose from "mongoose";
import Forum from "../Models/Forum.js";
import User from "../Models/User.js";

export const getForumsByCategoryId = async (req, res) => {

    const categoryId = req.params.categoryId;

    try {
        let forums = await Forum.find({ categoryId: categoryId });
        return res.status(200).json(forums);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

export const createForum = async (req, res) => {
    const forum = new Forum({
        categoryId: req.body.categoryId,
        name: req.body.name,
        description: req.body.description
    });
    try {
        await forum.save();
        return res.status(200).json(forum);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const updateForum = async (req, res) => {
    const forumId = req.params.id;

    try {
        // console.log(forum.title.toString(), title);
        const forum = await Forum.findByIdAndUpdate(forumId);
        await forum.updateOne({ $set: req.body })

        return res.status(200).json({ message: "Forum updated!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

export const deleteForum = async (req, res) => {
    const forumId = req.params.id;

    try {
        const forum = await forum.findById(forumId);
        console.log(userId, forum.userId, forum._id)
        await forum.deleteOne();
        
        return res.status(200).json({ message: "Forum deleted." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};
