import express from "express";
import { deleteNotificationsByUserId, getNotificationsByUserId } from "../Controllers/NotificationController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";

const router = express.Router();

router.get("/", authMiddleWare, getNotificationsByUserId);
router.delete("/", authMiddleWare, deleteNotificationsByUserId);

export default router;