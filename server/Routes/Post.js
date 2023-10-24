import express from "express";
import { getPostsByLimit, createPost, deletePost, updatePost, votePost, getVotes } from "../Controllers/PostController.js";

const router = express.Router();

router.get("/limit/:limit", getPostsByLimit);
router.get("/votes/:id", getVotes);
router.post("/", createPost);
router.put("/:id", updatePost);
router.put("/:id/vote/:type", votePost);
router.delete("/:id", deletePost);

export default router;