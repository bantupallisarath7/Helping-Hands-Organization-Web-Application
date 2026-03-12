import fs from "fs";
import path from "path";
import Gallery from "../../Models/Gallery.js";
import errorHandler from "../../ErrorHandlers/errorHandler.js";

const deleteController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const image = await Gallery.findById(id);
    if (!image) {
      return next(errorHandler(404, "Image not found"));
    }
    const filePath = path.join("uploads", path.basename(image.imageUrl));
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("File deletion error:", err);
      }
    });

    await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully"
    });
  } catch (error) {
    next(errorHandler(500, error.message || "Failed to delete image"));
  }
};

export default deleteController;