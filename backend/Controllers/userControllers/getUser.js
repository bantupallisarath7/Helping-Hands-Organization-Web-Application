import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../Models/User.js";
import errorHandler from "../../ErrorHandlers/errorHandler.js";


const getUser = async (req, res, next) => {
    const { email, password, role } = req.body
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }
        if (!user.isActive) {
            return next(errorHandler(403, "Account is inactive"));
        }
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            return next(errorHandler(401, "Invalid password"));
        }
        if (role.toLowerCase() !== user.role.toLowerCase()) {
            return next(errorHandler(401, `Access denied: Change the role`))
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY,);
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        })
        res.status(201).json({
            success: true,
            message: `${user.role === "admin" ? "Admin" : "User"} Sign in successfully`,
            user: {
                userId: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default getUser;