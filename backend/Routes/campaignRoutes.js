import express from "express";
import verifyToken from "../Middlewares/verifyToken.js";
import createCampaign from "../Controllers/campaignControllers/createCampaign.js"
import getCampaign from "../Controllers/campaignControllers/getCampaign.js"
import updateCampaign from "../Controllers/campaignControllers/updateCampaign.js";
import deleteCampaign from "../Controllers/campaignControllers/deleteCampaign.js"
import getApprovedCampaigns from "../Controllers/campaignControllers/getApprovedCampaigns.js";
import verifyAdmin from "../Middlewares/verifyAdmin.js";
import updateStatusCampaign from "../Controllers/campaignControllers/updateStatusCampaign.js";
import updateIsEmergency from "../Controllers/campaignControllers/updateIsEmegency.js";

const router = express.Router();

router.post("/add", verifyToken, createCampaign);
router.get("/all", verifyToken, getCampaign);
router.put("/update/:campaignId", verifyToken, updateCampaign);
router.delete("/delete/:campaignId", verifyToken, deleteCampaign);
router.get("/approved/all", getApprovedCampaigns);
router.put("/update/status/:campaignId", verifyToken, updateStatusCampaign);
router.put("/update/emergency/status/:campaignId", verifyToken, updateIsEmergency);

export default router;