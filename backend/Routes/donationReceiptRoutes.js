import express from "express";
import verifyToken from "../Middlewares/verifyToken.js";
import createDonationReceipt from "../Controllers/donationReceiptsControllers/createDonationReceipt.js";
import getDonationReceipt from "../Controllers/donationReceiptsControllers/getDonationReceipt.js";
import updateDonationReceipt from "../Controllers/donationReceiptsControllers/updateDonationReceipt.js";
import deleteDonationReceipt from "../Controllers/donationReceiptsControllers/deleteDonationReceipt.js";
import getDonationAmount from "../Controllers/donationReceiptsControllers/getDonationAmount.js";
import updateReceiptStatus from "../Controllers/donationReceiptsControllers/updateReceiptStatus.js";
import getAllDonationAmount from "../Controllers/donationReceiptsControllers/getAllDonationAmount.js";

const router = express.Router();

router.post("/add", verifyToken, createDonationReceipt);
router.get("/all", verifyToken, getDonationReceipt);
router.put("/update/:receiptId", verifyToken, updateDonationReceipt);
router.delete("/delete/:receiptId", verifyToken, deleteDonationReceipt);
router.get("/all/donatedamount", verifyToken, getDonationAmount);
router.put("/update/status/:receiptId", verifyToken, updateReceiptStatus)
router.get("/all/collectedamount", getAllDonationAmount)

export default router;