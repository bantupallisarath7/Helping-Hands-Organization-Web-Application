import User from "../../Models/User.js";
import errorHandler from "../../ErrorHandlers/errorHandler.js";

const updateProfilePhoto = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!req.file) {
      return next(errorHandler(400, "No image uploaded"));
    }

    const imageUrl = req.file.path; 

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePhotoUrl: imageUrl },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile photo updated successfully",
      photo: imageUrl
    });

  } catch (error) {
    next(errorHandler(500, error.message || "Internal Server Error"));
  }
};

export default updateProfilePhoto;