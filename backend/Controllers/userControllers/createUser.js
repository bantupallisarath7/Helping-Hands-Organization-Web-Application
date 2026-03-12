import bcrypt from "bcryptjs";
import errorHandler from "../../ErrorHandlers/errorHandler.js";
import User from "../../Models/User.js";

const createUser = async (req, res, next) => {
    const { fullName, email, password } = req.body
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(409, "User already exists"));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully"
        });

    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default createUser;