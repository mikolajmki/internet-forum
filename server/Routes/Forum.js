import express from "express";
import { getForumsByCategoryId, createForum, updateForum, deleteForum } from "../Controllers/ForumController.js";
import { adminMiddleWare } from "../MiddleWare/adminMiddleWare.js";

const router = express.Router();

router.get("/:categoryId", getForumsByCategoryId);
router.post("/:adminId", adminMiddleWare, createForum);
router.put("/:id/:adminId", adminMiddleWare, updateForum);
router.delete("/:id/:adminId", adminMiddleWare, deleteForum);

export default router;