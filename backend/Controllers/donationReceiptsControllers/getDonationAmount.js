import DonationReceipt from "../../Models/DonationReceipt.js";
import errorHandler from "../../ErrorHandlers/errorHandler.js";
import User from "../../Models/User.js"
const getDonationAmount = async (req, res, next) => {
    try {
        const getApprovedReceipts = await DonationReceipt.find({ createdBy: req.user.id, status: "approved" })

        const amount = getApprovedReceipts.reduce((total, receipt) => total + receipt.donatedAmount, 0);
        const user = await User.findByIdAndUpdate(req.user.id, { donatedAmount: amount });
        res.status(200).json({
            success: true,
            message: "Donated amount fetched successfully",
            amount
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default getDonationAmount; 