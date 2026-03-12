import errorHandler from "../../ErrorHandlers/errorHandler.js"
import DonationReceipt from "../../Models/DonationReceipt.js";

const getAllDonationAmount = async (req, res, next) => {
    try {
        const receipts = await DonationReceipt.find({ status: "approved" });
        const amount = receipts.reduce((total, receipt) => total + receipt.donatedAmount, 0);
        res.status(200).json({
            success: true,
            message: "Collected amount fetched successfully",
            amount
        })
    } catch (error) {
        next(errorHandler(500, error.message));
    }
}

export default getAllDonationAmount;