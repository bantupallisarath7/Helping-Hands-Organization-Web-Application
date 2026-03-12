import errorHandler from "../../ErrorHandlers/errorHandler.js";
import Gallery from "../../Models/Gallery.js";
const getController = async (req, res, next) => {
  try {
    const images = await Gallery.find().sort({ uploadedAt: -1 });
    res.status(200).json({
      success: true,
      message: "Images Successfully fetched",
      images
    });
  } catch (error) {
    next(errorHandler(500, error.message || "Internal server error"))
  }
};

export default getController;