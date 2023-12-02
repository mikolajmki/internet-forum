import express from "express";
import { createForum, updateForum, deleteForum, followForum, getForumById, getFoumsByCategoryId } from "../Controllers/ForumController.js";
import { adminMiddleWare } from "../MiddleWare/adminMiddleWare.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";
import { moderatorMiddleWare } from "../MiddleWare/moderatorMiddleware.js";

const router = express.Router();

router.get("/:id", getForumById);
router.get("/categoryId/:id", getFoumsByCategoryId);

router.post("/", authMiddleWare, moderatorMiddleWare, createForum);
router.put("/:id/follow/", authMiddleWare, followForum);

router.put("/:id/", authMiddleWare, updateForum);
router.delete("/:id/categoryId/:categoryId", authMiddleWare, moderatorMiddleWare, deleteForum);

export default router;