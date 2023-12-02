import express from "express";
import { getThreadsByLimit, getThreadsByAuthorId, getThreadsByForumId, getThreadWithPostsById, createThread, updateThread, deleteThread, followThread, getAllThreadsWithPosts, getThreadsByForumIdSortedByParam, toggleThreadIsClosed } from "../Controllers/ThreadController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";
import { moderatorMiddleWare } from "../MiddleWare/moderatorMiddleware.js";

const router = express.Router();

router.get("/", getAllThreadsWithPosts);
router.get("/limit/:limit", getThreadsByLimit);
router.get("/authorId/:authorId", getThreadsByAuthorId);

router.get("/forumId/:forumId", getThreadsByForumId);
router.get("/forumId/:forumId/sort/:sort", getThreadsByForumIdSortedByParam)

router.get("/:id", getThreadWithPostsById);

router.post("/", authMiddleWare, createThread);

router.put("/:id/follow", authMiddleWare, followThread);
router.put("/:id", authMiddleWare, updateThread);
router.put("/toggle/closed", authMiddleWare, moderatorMiddleWare, toggleThreadIsClosed);

router.delete("/:id", authMiddleWare, deleteThread);

export default router;