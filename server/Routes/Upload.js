import express from 'express';
import multer from 'multer';
import authMiddleWare from '../MiddleWare/authMiddleWare.js';
import fs from "fs";

const threadStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = `public/images/${req.body.threadId}`;
        fs.mkdirSync(path, { recursive: true })
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename);
    }
});

const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = `public/images/users/${req.body.username}`;
        fs.mkdirSync(path, { recursive: true })
        console.log("username", req.body.username);
        cb(null, path);
    },
    filename: (req, file, cb) => {
        console.log("username", req.body.filename);
        cb(null, req.body.filename);
    }
});

const uploadThread = multer({ storage: threadStorage });
const uploadUser = multer({ storage: userStorage });

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


export default router;