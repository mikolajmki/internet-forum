import express from "express";
import mongoose from "mongoose";
import Category from "../Models/Category.js";
import User from "../Models/User.js";

export const getCategories = async (req, res) => {
    try {
        let categories = await Category.find();
        
        return res.status(200).json(categories);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
};

export const createCategory = async (req, res) => {
    const category = new Category({
        title: req.body.title,
    });
    try {
        await category.save();
        return res.status(200).json(category);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const userId = req.body.userId;

    const user = await User.findById(userId);

    try {
        // console.log(category.title.toString(), title);
        const category = await Category.findByIdAndUpdate(categoryId);
        await category.updateOne({ $set: req.body })
        return res.status(200).json({ message: "Category updated!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

export const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    const userId = req.body.userId;

    const user = await User.findById(userId);
    try {
        const category = await category.findById(categoryId);
        console.log(userId, category.userId, category._id)
        await category.deleteOne();
        return res.status(200).json({ message: "category deleted." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};