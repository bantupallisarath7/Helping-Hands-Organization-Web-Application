import errorHandler from "../../ErrorHandlers/errorHandler.js";
import User from "../../Models/User.js";

const deleteUser = async (req, res, next) => {
    const { userId } = req.params
    try {
        const user = await User.findByIdAndDelete(userId);
        if (req.user.role !== "admin") {
            return next(errorHandler(403, "unauthorized"));
        }
        res.status(200).json({
            success: true,
            message: "User deleted"
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"))
    }
}
export default deleteUser;