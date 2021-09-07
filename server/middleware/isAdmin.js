import jwt from "jsonwebtoken";
import User from "../models/User.js";
const isAdmin = async (req, res, next) => {
    try {
        //get token from headers
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).send({
                errors: [{ msg: " you are not authorized" }],
            });
        }
        //token is match?
        const decoded = jwt.verify(token, "test");
        //verify token
        //find user by id
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            return res.status(401).send({
                errors: [{ msg: " you are not authorized" }],
            });
        }
        if (user.role !== "admin") {
            return res.status(401).send({
                errors: [{ msg: " you are not authorized" }],
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ errors: [{ msg: " you are not authorized" }] });
    }
};
export default isAdmin;