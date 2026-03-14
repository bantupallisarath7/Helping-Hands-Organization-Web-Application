import express from "express";
import createUser from "../Controllers/userControllers/createUser.js";
import getUser from "../Controllers/userControllers/getUser.js";
import verifyToken from "../Middlewares/verifyToken.js";
import signOut from "../Controllers/userControllers/signOut.js";
import updateUser from "../Controllers/userControllers/updateUser.js";
import getUserById from "../Controllers/userControllers/getUserById.js";
import deleteUser from "../Controllers/userControllers/deleteUser.js";
import updateUserIsActive from "../Controllers/userControllers/updateUserIsActive.js";
import updateProfilePhoto from "../Controllers/userControllers/updateProfilePhoto.js";
import deleteProfilePhoto from "../Controllers/userControllers/deleteProfilePhoto.js";
import uploadProfile from "../Middlewares/uploadProfile.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", getUser);
router.put("/update/profile", verifyToken, updateUser);
router.post("/signout", signOut);
router.get("/get/:userId", getUserById);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.put("/update/isactive/:userId", verifyToken, updateUserIsActive);
router.post("/upload/profile-photo/:userId", verifyToken, uploadProfile.single("photo"), updateProfilePhoto);
router.delete("/delete/profile-photo/:userId", verifyToken, deleteProfilePhoto);

export default router;
