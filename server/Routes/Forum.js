import express from "express";
import { createForum, updateForum, deleteForum, followForum, getForumById } from "../Controllers/ForumController.js";
import { adminMiddleWare } from "../MiddleWare/adminMiddleWare.js";

const router = express.Router();

router.get("/:id", getForumById);

router.post("/:adminId", adminMiddleWare, createForum);
router.put("/:id/follow/:type", followForum);

router.put("/:id/:adminId", adminMiddleWare, updateForum);
router.delete("/:id/:adminId", adminMiddleWare, deleteForum);

export default router;