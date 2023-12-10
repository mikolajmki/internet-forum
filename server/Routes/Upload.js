import express from 'express';
import multer from 'multer';
import authMiddleWare from '../MiddleWare/authMiddleWare.js';
import fs from "fs/promises";

const threadStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const path = `public/images/${req.body.threadId}`;
        await fs.mkdir(path, { recursive: true })
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename);
    }
});

const userStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const path = `public/images/users/${req.body.username}`;
        await fs.mkdir(path, { recursive: true })
        console.log("username", req.body.username);
        cb(null, path);
    },
    filename: (req, file, cb) => {
        console.log("username", req.body.filename);
        cb(null, req.body.filename);
    }
});


const deleteThreadStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const path = `public/images/${req.body.threadId}`;
        const images = req.body.images;
        const existing = await fs.readdir(path);

        console.log("existing", existing)
        console.log("images", images)

        const deletePromises = existing.map((file) => { 
            if (!images.includes(file)) {
                fs.unlink(path + "/" + file);
            }
        });
        
        await Promise.all(deletePromises);
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename);
    }
});

const uploadThread = multer({ storage: threadStorage });
const uploadUser = multer({ storage: userStorage });
const deleteThread = multer({ storage: deleteThreadStorage });

const router = express.Router();

router.post('/thread', uploadThread.single("file"), (req, res) => {
    try {
        return res.status(200).json({ message: "Image uploaded." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
});

router.post('/profile', uploadUser.single("file"), (req, res) => {
    try {
        return res.status(200).json({ message: "Image uploaded." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
});

router.put('/thread/delete', async (req, res) => {
    try {
        const path = `public/images/${req.body.threadId}`;
        const images = req.body.images;
        const existing = await fs.readdir(path);

        console.log("existing", existing)
        console.log("images", images)

        const deletePromises = existing.map((file) => { 
            if (!images.includes(file)) {
                fs.unlink(path + "/" + file);
            }
        });
        
        await Promise.all(deletePromises);
        return res.status(200).json({ message: "Image deleted." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
});


export default router;