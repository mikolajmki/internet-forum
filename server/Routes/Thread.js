import express from "express";
import { getThreadsByForumId, getThreadWithPostsById, createThread, updateThread, deleteThread } from "../Controllers/ThreadController.js";

const router = express.Router();

router.get("/forumId/:forumId", getThreadsByForumId);
router.get("/:id", getThreadWithPostsById);
router.post("/", createThread);
router.put("/:id/:userId", updateThread);
router.delete("/:id/:userId", deleteThread);

export default router;