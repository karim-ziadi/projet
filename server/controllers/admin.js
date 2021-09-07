import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/postMessage.js";
const router = express.Router();
//getUsers
export const getUsers = async (req, res) => {
    try {
        // finding something inside a model is time taking, so we need to add await
        const users = await User.find();
        // console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find()
            .sort({ _id: -1 })
            .limit(LIMIT)
            .skip(startIndex);
        res.json({
            data: posts,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT),
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const updatUser = async (req, res) => {
    const id = req.params.id;
    try {
        //find product
        const findUser = await User.findOne({
            _id: id,
        });
        if (!findUser) {
            return res.status(404).send({
                errors: [{ msg: "Usernot found" }],
            });
        }
        await User.updateOne({ _id: id }, { $set: { ...req.body } });
        res.status(200).send({ msg: "edit user" });
    } catch (error) {
        console.log(error);
        res.status(500).send("impossible to edit users" + error);
    }
};
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No user with id: ${id}`);
    await User.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully." });
};
// Post
export const updatePost = async (req, res) => {
    const id = req.params.id;
    try {
        //find product
        const findPost = await Post.findOne({
            _id: id,
        });
        if (!findPost) {
            return res.status(404).send({
                errors: [{ msg: "Postnot found" }],
            });
        }
        await Post.updateOne({ _id: id }, { $set: { ...req.body } });
        res.status(200).send({ msg: "edit post" });
    } catch (error) {
        console.log(error);
        res.status(500).send("impossible to edit post" + error);
    }
};
export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
    await Post.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
};
export default router;