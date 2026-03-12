import errorHandler from "../../ErrorHandlers/errorHandler.js";
import User from "../../Models/User.js"

const updateUserIsActive = async (req, res, next) => {
    const { isActive } = req.body
    const { userId } = req.params
    try {
        const user = await User.findById(userId);
        if (req.user.role !== "admin") {
            return next(errorHandler(403, "Admin only can do this"))
        }
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        user.isActive = isActive
        await user.save()
        res.status(200).json({
            success: true,
            message: "User active status updated successfully "
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default updateUserIsActive;