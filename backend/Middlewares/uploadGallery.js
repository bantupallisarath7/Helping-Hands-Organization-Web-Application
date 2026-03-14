import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const galleryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hho_gallery",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const uploadGallery = multer({ storage: galleryStorage });

export default uploadGallery;