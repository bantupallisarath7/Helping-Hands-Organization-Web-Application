import errorHandler from "../../ErrorHandlers/errorHandler.js";
import Gallery from "../../Models/Gallery.js";

const uploadController = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(errorHandler(400, "No image uploaded"));
    }

    const imageUrl = req.file.path;      
    const publicId = req.file.filename; 

    const newImage = new Gallery({ imageUrl, publicId });
    await newImage.save();

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    next(errorHandler(500, error.message || "Internal server error"));
  }
};

export default uploadController;