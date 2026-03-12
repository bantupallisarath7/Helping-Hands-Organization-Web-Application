import errorHandler from "../../ErrorHandlers/errorHandler.js";
import User from "../../Models/User.js"
const updateUser = async (req, res, next) => {
  const { userId, fullName, email, phoneNumber, dob, isHHOMember, profilePhotoUrl } = req.body;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    if (!user.isActive) {
      return next(errorHandler(403, "Account is inactive"));
    }

    if (!fullName && !email && !phoneNumber && !dob && isHHOMember === undefined && !profilePhotoUrl) {
      return next(errorHandler(400, "No changes found"));
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (dob) user.dob = dob;
    if (isHHOMember !== undefined) user.isHHOMember = isHHOMember;
    if (profilePhotoUrl) user.profilePhotoUrl = profilePhotoUrl;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      user
    });
  } catch (error) {
    console.error("Admin update error:", error);
    next(errorHandler(500, error.message || "Internal Server Error"));
  }
};

export default updateUser;