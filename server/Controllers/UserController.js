import User from '../Models/User.js';
import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUser = async (req, res) => {
    
    const id = req.params.id;
    
    try {
        const user = await User.findById(id);

        if (user) {
            const { password, ...otherDetails } = user._doc;
            return res.status(200).json(otherDetails);
        } else {
            return res.status(404).json({ message: "User doesn't exist." });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const getUsersModerators = async (req, res) => {
    
    try {
        const users = await User.find({ isModerator: true })
        .select("username profilePicture reputation answers createdAt");
        
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const getUsersByUsernameLike = async (req, res) => {

    const username = req.params.username;

    try {
        const users = await User.find({ username: { $regex: username, $options: "i" } })
        .select("username profilePicture reputation answers createdAt isModerator");

        if (users) {
            return res.status(200).json(users);
        } else {
            return res.status(204).json([]);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const toggleUserIsModerator = async (req, res) => {

    const toggleUserId = req.body.toggleUserId;
    console.log(toggleUserId)

    try {
        const user = await User.findOneAndUpdate({ _id: toggleUserId }, [ { $set: { isModerator: { $eq: [ false, "$isModerator" ] } } } ]);
        
        user.isModerator ? await user.updateOne({ rank: "Uzytkownik" }) : await user.updateOne({ rank: "Moderator" });

        return res.status(200).json({ message: "Toggled successfully." });
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const updateUser = async (req, res) => {
    
    const id = req.params.id;
    
    if (id === req.body._id) {
        
        try {
            
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            
            const user = await User.findByIdAndUpdate(id, req.body, {new: true});
            const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
            
            return res.status(200).json({ user, token });
        } catch (err) { 
            
            console.log(err);
            return res.status(500).json({ message: "Couldn't update" });
        }
    }
    
    return res.status(500).json({ message: "Access denied! You can only access your own profile." }); 
}

export const deleteUser = async (req, res) => {
    
    const id = req.params.id;
    
    if (id === req.body.currentUserId || req.body.isAdmin === true) {
        
        try {
            await User.findByIdAndDelete(id);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        return res.status(200).json({ message: "User deleted succesfully." });
    }
    return res.status(500).json({ message: "Access denied! You can only delete your own profile." });
}

export const followUser = async (req, res) => {
    
    const currentUserId = mongoose.Types.ObjectId(req.params.id);
    const id = mongoose.Types.ObjectId(req.body._id);
    
    if (id === currentUserId) {
        return res.status(403).json({ message: "Action forbidden." });
    }
    try {
        const followUser = await User.findById(id);
        const followingUser = await User.findById(currentUserId);

        if (!followUser.followers.includes(currentUserId)) {
            await followUser.updateOne({ $push: { followers: currentUserId } });
            await followingUser.updateOne({ $push: { following: id} });
            return res.status(200).json({ message: "User followed." });
        }
        return res.status(500).json({ message: "You follow this user already." })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
}

export const unfollowUser = async (req, res) => {
    
    const currentUserId = mongoose.Types.ObjectId(req.params.id);
    const id = mongoose.Types.ObjectId(req.body._id);
    
    if (id === currentUserId) {
        return res.status(403).json({ message: "Action forbidden." });
    }
    try {
        const followUser = await User.findById(id);
        const followingUser = await User.findById(currentUserId);

        if (followUser.followers.includes(currentUserId)) {
            await followUser.updateOne({ $pull: { followers: currentUserId } });
            await followingUser.updateOne({ $pull: { following: id} });
            return res.status(200).json({ message: "User unfollowed." });
        }
        return res.status(500).json({ message: "You don't follow this user." })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
}

export const getAllUsers = async (req, res) => {
    
    try {
        
        let users = await User.find();
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc;
            return otherDetails;
        });
        
        return res.status(200).json(users);
    } catch (err) {
        
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
}