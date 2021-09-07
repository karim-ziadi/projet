import express from "express";
import {
    deletePost,
    deleteUser,
    getPosts,
    getUsers,
    updatePost,
    updatUser,
} from "../controllers/admin.js";
import isAdmin from "../middleware/isAdmin.js";
const router = express.Router();
//get all users
router.get("/allusers",  getUsers);
router.put("/updateUser/:id", isAdmin, updatUser);
router.delete("/deleteUser/:id", isAdmin, deleteUser);
// ROUTE POST
router.get("/allposts", isAdmin, getPosts);
router.put("/updatePost/:id", isAdmin, updatePost);
router.delete("/deletePost/:id", isAdmin, deletePost);
export default router;