import Forum from "../Models/Forum.js";
import Category from "../Models/Category.js";

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
    const categoryId = req.body.categoryId;
    const forumId = req.params.id;

    try {
        
        await Category.findByIdAndUpdate({ _id: categoryId }, { $pull: { forums: forumId } });
        await Forum.findOneAndDelete({ _id: forumId });
        
        return res.status(200).json({ message: "Forum deleted." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};
