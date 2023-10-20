import express from "express";
import { getThreadsByForumId, getThreadWithPostsById, createThread, updateThread, deleteThread } from "../Controllers/ThreadController.js";

const router = express.Router();

router.get("/:forumId", getThreadsByForumId);
router.get("/full/:id", getThreadWithPostsById);
router.post("/", createThread);
router.put("/:id", updateThread);
router.delete("/:id", deleteThread);

export default router;