import errorHandler from "../../ErrorHandlers/errorHandler.js";
import DonationReceipt from "../../Models/DonationReceipt.js";

const createDonationReceipt = async (req, res, next) => {
    const {
        donorName,
        campaignTitle,
        requestedStudent,
        transactionId,
        donatedAmount,
        donationDate,
        createdForCampaign
    } = req.body;

    try {
        const existingReceipt = await DonationReceipt.findOne({ transactionId });
        if (existingReceipt) {
            return next(errorHandler(409, "Transaction ID already exists"));
        }

        const newReceipt = new DonationReceipt({
            donorName,
            campaignTitle,
            requestedStudent,
            transactionId,
            donatedAmount,
            donationDate,
            createdForCampaign,
            createdBy: req.user.id,
        });

        await newReceipt.save();

        res.status(201).json({
            success: true,
            message: "Donation receipt created successfully"
        });
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
};

export default createDonationReceipt;