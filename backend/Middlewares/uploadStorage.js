import multer from 'multer';

const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/gallery"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage: galleryStorage });

export default upload;