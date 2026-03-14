import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hho_profiles",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const uploadProfile = multer({ storage: profileStorage });

export default uploadProfile;