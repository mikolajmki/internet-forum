import express from "express";
import { createPost, deletePost } from "../Controllers/PostController.js";

const router = express.Router();

router.post("/:threadId", createPost);
// router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;