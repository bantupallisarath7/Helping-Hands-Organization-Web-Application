import errorHandler from "../../ErrorHandlers/errorHandler.js";
import Gallery from "../../Models/Gallery.js";

const uploadController = async (req, res, next) => {
    const imageUrl = `/uploads/gallery/${req.file.filename}`
    try {
        const newImage = new Gallery({ imageUrl });
        await newImage.save();
        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal server error"))
    }
}

export default uploadController;