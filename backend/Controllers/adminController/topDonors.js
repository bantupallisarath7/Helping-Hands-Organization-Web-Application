import errorHandler from "../../ErrorHandlers/errorHandler.js";
import User from "../../Models/User.js";

const topDonors = async (req, res, next) => {
  try {
    const limit = 5;

    const topDonors = await User.find({ donatedAmount: { $gt: 0 } })
      .sort({ donatedAmount: -1 })
      .limit(limit)
      .select("fullName profilePhotoUrl donatedAmount");

    const formatted = topDonors.map((user) => ({
      name: user.fullName || "Anonymous",
      photo: user.profilePhotoUrl ? `http://localhost:8815${user.profilePhotoUrl}` : null,
      amount: user.donatedAmount,
    }));

    res.status(200).json({
      success: true,
      message: "Top donors successfully fetched",
      donors: formatted,
    });
  } catch (error) {
    next(errorHandler(500, error.message || "Internal Server Error"));
  }
};

export default topDonors;