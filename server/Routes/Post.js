import express from "express";
import { getPostsByLimit, createPost, deletePost, updatePost, votePost, getVotes } from "../Controllers/PostController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.get("/limit/:limit", getPostsByLimit);
router.get("/votes/:id", getVotes);
router.post("/", authMiddleWare, createPost);
router.put("/:id", authMiddleWare, updatePost);
router.put("/:id/vote/:type", authMiddleWare, votePost);
router.delete("/:id/threadId/:threadId", authMiddleWare, deletePost);

export default router;