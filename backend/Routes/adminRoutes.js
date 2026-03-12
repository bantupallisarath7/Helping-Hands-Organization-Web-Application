import express from "express";
import getAllCampaigns from "../Controllers/adminController/getAllCampaigns.js";
import getAllUsers from "../Controllers/adminController/getAllUsers.js";
import getAllDonationReceipts from "../Controllers/adminController/getAllDonationReceipts.js";
import createEvent from "../Controllers/eventControllers/createEvent.js";
import verifyToken from "../Middlewares/verifyToken.js"
import deleteEvent from "../Controllers/eventControllers/deleteEvent.js";
import updateEvent from "../Controllers/eventControllers/updateEvent.js";
import getAllEvents from "../Controllers/eventControllers/getAllEvents.js";
import autoUpdateEventStatuses from "../Controllers/eventControllers/autoUpdateEventStatuses.js";
import updateEventStatuses from "../Controllers/adminController/updateEventStatuses.js";
import upload from "../Middlewares/uploadStorage.js";
import uploadController from "../Controllers/galleryController/uploadController.js";
import getController from "../Controllers/galleryController/getController.js";
import deleteController from "../Controllers/galleryController/deleteController.js";
import topDonors from "../Controllers/adminController/topDonors.js";

const router = express.Router();

router.get("/campaign/all", getAllCampaigns);
router.get("/user/all", getAllUsers);
router.get("/receipt/all", getAllDonationReceipts);
router.post("/event/add", verifyToken, createEvent);
router.delete("/event/delete/:eventId", verifyToken, deleteEvent);
router.put("/event/update/:eventId", verifyToken, updateEvent);
router.get("/event/all", getAllEvents);
router.put("/event/autoupdate/all", autoUpdateEventStatuses)
router.put("/event/update/status/:eventId", verifyToken, updateEventStatuses)
router.post('/gallery/upload', upload.single("image"), uploadController)
router.get("/gallery/all", getController);
router.delete('/gallery/delete/:id', deleteController)
router.get("/top-donors", topDonors);

export default router;