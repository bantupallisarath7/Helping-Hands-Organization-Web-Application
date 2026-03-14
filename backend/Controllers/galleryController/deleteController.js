import Gallery from "../../Models/Gallery.js";
import errorHandler from "../../ErrorHandlers/errorHandler.js";
import cloudinary from "../../config/cloudinary.js";

const deleteController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const image = await Gallery.findById(id);
    if (!image) {
      return next(errorHandler(404, "Image not found"));
    }

    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    next(errorHandler(500, error.message || "Failed to delete image"));
  }
};

export default deleteController;