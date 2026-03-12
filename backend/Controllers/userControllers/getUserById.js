import errorHandler from "../../ErrorHandlers/errorHandler.js";
import User from "../../Models/User.js";

const getUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return next(errorHandler(404, "User not found"))
        }
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user
        });
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"))
    }
}
export default getUserById;