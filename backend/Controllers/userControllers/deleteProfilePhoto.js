import errorHandler from "../../ErrorHandlers/errorHandler.js";
import User from "../../Models/User.js";
import cloudinary from "../../config/cloudinary.js";

const deleteProfilePhoto = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Delete from Cloudinary if publicId exists
    if (user.profilePhotoPublicId) {
      await cloudinary.uploader.destroy(user.profilePhotoPublicId);
    }

    // Clear fields in DB
    user.profilePhotoUrl = "";
    user.profilePhotoPublicId = "";
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile photo deleted successfully"
    });
  } catch (error) {
    next(errorHandler(500, error.message || "Internal Server Error"));
  }
};

export default deleteProfilePhoto;