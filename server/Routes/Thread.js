import express from "express";
import { getThreadsByLimit, getThreadsByAuthorId, getThreadsByForumId, getThreadWithPostsById, createThread, updateThread, deleteThread, followThread } from "../Controllers/ThreadController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.get("/limit/:limit", getThreadsByLimit);
router.get("/authorId/:authorId", getThreadsByAuthorId);
router.get("/forumId/:forumId", getThreadsByForumId);
router.get("/:id", getThreadWithPostsById);

router.post("/", authMiddleWare, createThread);
router.put("/:id/follow/:type", authMiddleWare, followThread);

router.put("/:id/:userId", authMiddleWare, updateThread);
router.delete("/:id", authMiddleWare, deleteThread);

export default router;