import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose"

import UserModal from "../models/User.js";

const secret = "test";

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (!oldUser)
            return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            oldUser.password
        );

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { email: oldUser.email, id: oldUser._id },
            secret,
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: oldUser, token });
        
    } catch (err) {
        
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser)
            return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        });

        const token = jwt.sign(
            { email: result.email, id: result._id },
            secret,
            { expiresIn: "1h" }
        );

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
};

export const getUsers = async (req, res) => {
    try {
        // finding something inside a model is time taking, so we need to add await
        const users = await UserModal.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// export const updateUser = async (req, res) => {
//     const { id } = req.params;
//     const user = await UserModal.findByIdAndUpdate(id);

//     if (!id) {
//         return res.status(404).json({ message: error.message });
//     }
//     if (user) {
//         user.name = req.body.name || user.name;
//         user.email = req.body.email || user.email;
//         if (req.body.password) {
//             user.password = req.body.password || user.password;
//         }

//         const updatedUser = await user.save();

//         res.status(200).json(user);
//     }
// };
export const updateUser = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No user with id: ${id}`);
    const { name, email, password, phone } = req.body;
    // const updatedUser = {
    //     name,
    //     email,
    //     password,
    //     phone,
    // };
    await UserModal.findByIdAndUpdate(id, {$set : {...req.body}}, { new: true });
    res.json('User has been updated');
};
export const getUser = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    try {
        const user = await UserModal.findById(id);
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(404).send(`No user with id: ${id}`);

    await UserModal.findByIdAndRemove(id);

    res.json({ message: "user deleted successfully." });
};
