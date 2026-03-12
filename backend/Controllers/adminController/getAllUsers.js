import errorHandler from "../../ErrorHandlers/errorHandler.js";
import User from "../../Models/User.js"
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: users.length > 0
                ? "All users retrieved successfully"
                : "No users found",
            users
        });
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default getAllUsers;