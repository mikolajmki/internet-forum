import express from "express";
import { getUser, updateUser, deleteUser, followUser, unfollowUser, getAllUsers, getUsersModerators, getUsersByUsernameLike, toggleUserIsModerator } from "../Controllers/UserController.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";
import { adminMiddleWare } from "../MiddleWare/adminMiddleWare.js";
const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:id", getUser);
router.get("/all/moderators", getUsersModerators)
router.get("/username/:username", getUsersByUsernameLike);

router.put("/:id", authMiddleWare, updateUser);
router.put("/toggle/moderator", authMiddleWare, adminMiddleWare, toggleUserIsModerator);
router.put("/:id/follow", authMiddleWare, followUser);
router.put("/:id/unfollow", authMiddleWare, unfollowUser);

router.delete("/:id", authMiddleWare, deleteUser);

export default router;