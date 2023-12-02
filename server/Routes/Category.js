import express from "express";
import { getCategoriesWithForums, createCategory, updateCategory, deleteCategory } from "../Controllers/CategoryController.js";
import { adminMiddleWare } from "../MiddleWare/adminMiddleWare.js";
import authMiddleWare from "../MiddleWare/authMiddleWare.js";
import { moderatorMiddleWare } from "../MiddleWare/moderatorMiddleware.js";

const router = express.Router();

router.get("/", getCategoriesWithForums);
router.post("/", authMiddleWare, moderatorMiddleWare, createCategory);
router.put("/:id/:adminId", updateCategory);
router.delete("/:id/", authMiddleWare, moderatorMiddleWare, deleteCategory);

export default router;