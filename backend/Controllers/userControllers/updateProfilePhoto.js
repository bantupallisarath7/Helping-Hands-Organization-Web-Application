import User from '../../Models/User.js'
import errorHandler from "../../ErrorHandlers/errorHandler.js"

const updateProfilePhoto = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const filePath = `/uploads/profiles/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePhotoUrl: filePath },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile photo updated successfully",
    });
  } catch (error) {
    next(errorHandler(500, error.message || "Internal Server Error"))
  }
};
export default updateProfilePhoto;