import errorHandler from "../../ErrorHandlers/errorHandler.js";
import User from "../../Models/User.js";

const deleteProfilePhoto = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return next(errorHandler(404, "user not found"))
        }
        user.profilePhotoUrl = "";
        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile photo deleted successfully"
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"))
    }
}
export default deleteProfilePhoto;