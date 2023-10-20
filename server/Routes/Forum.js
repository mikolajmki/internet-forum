import express from "express";
import { createForum, updateForum, deleteForum } from "../Controllers/ForumController.js";
import { adminMiddleWare } from "../MiddleWare/adminMiddleWare.js";

const router = express.Router();

router.post("/:adminId", adminMiddleWare, createForum);
router.put("/:id/:adminId", adminMiddleWare, updateForum);
router.delete("/:id/:adminId", adminMiddleWare, deleteForum);

export default router;