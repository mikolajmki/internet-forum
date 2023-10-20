import express from "express";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../Controllers/CategoryController.js";
import { adminMiddleWare } from "../MiddleWare/adminMiddleWare.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/:adminId", adminMiddleWare, createCategory);
router.put("/:id/:adminId", adminMiddleWare, updateCategory);
router.delete("/:id/:adminId", adminMiddleWare, deleteCategory);

export default router;