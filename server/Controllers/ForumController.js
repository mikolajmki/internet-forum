import Forum from "../Models/Forum.js";
import Category from "../Models/Category.js";
import Thread from "../Models/Thread.js";
import mongoose from "mongoose";

export const followForum = async (req, res) => {

    const forumId = req.params.id;
    const userId = req.body.userId;
    const type = req.body.type;

    console.log(type)

    try {
        const forum = await Forum.findById(forumId);
        console.log(forum.followers, userId)
        if (type === 0 && forum.followers.includes(userId)) {
            // unfollow
            await forum.updateOne({ $pull: { followers: userId } });
        } else if (type === 1 && !forum.followers.includes(userId)) {
            // follow
            await forum.updateOne({ $push: { followers: userId } });
        } else {
            return res.status(403).json({ message: "Forbidden action." })
        }

        const result = await Forum.findById(forumId).select("followers");
        
        return res.status(200).json(result.followers);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const getFoumsByCategoryId = async (req, res) => {
    const categoryId = req.params.id;
    try {
        let forums = await Category.findById(categoryId)
        .populate(
            { path: "forums"})
            .select('forums')
        return res.status(200).json(forums)
    } catch (err) {
        return res.status(500).json({ message: err });
    } 
}

export const getForumById = async (req, res) => {
    const forumId = req.params.id;

    try {
        const forum = await Forum.findById(forumId);

        return res.status(200).json(forum);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
}

export const createForum = async (req, res) => {

    const categoryId = req.body.categoryId;

    const forum = new Forum({
        name: req.body.name,
        description: req.body.description
    });
    try {

        await Category.findByIdAndUpdate({ _id: categoryId }, { $push: { forums: forum._id } });

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
    const categoryId = req.params.categoryId;
    const forumId = req.params.id;

    try {
        
        const threads = await Thread.find({ forumId: forumId });

        if (threads.length === 0) {
            await Category.findByIdAndUpdate({ _id: categoryId }, { $pull: { forums: forumId } });
            await Forum.findOneAndDelete({ _id: forumId });
            return res.status(200).json({ message: "Forum deleted." });

        }
        return res.status(403).json({ message: "Action forbidden. Threads of " + threads.length + " remaining." });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};
