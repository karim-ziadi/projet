import express from "express";
const router = express.Router();

import {
    signin,
    signup,
    getUser,
    updateUser,
    getUsers,
    deleteUser,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

router.post("/signin", signin);
router.post("/signup", signup);

//get all users
router.get("/", auth, getUsers);
// //get user by ID
router.get("/:id", auth, getUser);
//update User
router.post("/:id",auth, updateUser);

//delete user
router.delete("/:id", auth, deleteUser);
export default router;
