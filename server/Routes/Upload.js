import express from 'express';
import multer from 'multer';
import authMiddleWare from '../MiddleWare/authMiddleWare.js';
import fs from "fs/promises";

const threadStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const path = `public/images/threads/${req.body.threadId}`;
        await fs.mkdir(path, { recursive: true })
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename);
    }
});

const threadStorageMultiple = multer.diskStorage({
    destination: async (req, file, cb) => {
        const path = `public/images/threads/${req.body.threadId}`;
        await fs.mkdir(path, { recursive: true });
        cb(null, path);
    },
    filename: async (req, file, cb) => {
        // const filenameAndExt = req.body.filename.split(".");
        // const filename = filenameAndExt[0].slice(0, -1) + (req.body.index ++)+ "." + filenameAndExt[1];
        const filename = req.body.filenames[req.body.index ++];
        cb(null, filename);
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


// const deleteThreadStorage = multer.diskStorage({
//     destination: async (req, file, cb) => {
//         const path = `public/images/${req.body.threadId}`;
//         const images = req.body.images;

//         console.log("images", images)

//         const deletePromises = images.map((file) => { 
//             fs.unlink(path + "/" + file);
//         });
        
//         await Promise.all(deletePromises);
//         cb(null, path);
//     },
//     filename: (req, file, cb) => {
//         cb(null, req.body.filename);
//     }
// });

const uploadThread = multer({ storage: threadStorage });
const uploadThreadMultiple = multer({ storage: threadStorageMultiple });
const uploadUser = multer({ storage: userStorage });
// const deleteThread = multer({ storage: deleteThreadStorage });

const router = express.Router();

router.post('/thread', uploadThread.single("file"), (req, res) => {
    try {
        return res.status(200).json({ message: "Image uploaded." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
});

router.post('/thread/multiple', uploadThreadMultiple.any("files"), async (req, res) => {
    try {
        console.log("body ", req.body);
        const path = `public/images/threads/${req.body.threadId}/`;

        console.log("0 ", req.body.filenames[0])

        await fs.rename(path + "I", path + req.body.filenames[0]);

        return res.status(200).json({ message: "Images uploaded." });
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
        const path = `public/images/threads/${req.body.threadId}`;
        const images = req.body.images;

        console.log("images", images)

        const deletePromises = images.map((file) => { 
            fs.unlink(path + "/" + file);
        });
        
        await Promise.all(deletePromises);
        return res.status(200).json({ message: "Images deleted." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
});


export default router;