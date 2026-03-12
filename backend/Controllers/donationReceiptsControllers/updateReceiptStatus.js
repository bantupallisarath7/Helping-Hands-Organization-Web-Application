import errorHandler from "../../ErrorHandlers/errorHandler.js";
import Campaign from "../../Models/Campaign.js";
import DonationReceipt from "../../Models/DonationReceipt.js";
import User from "../../Models/User.js"

const updateReceiptStatus = async (req, res, next) => {
    const { status } = req.body
    const { receiptId } = req.params;
    try {
        const receipt = await DonationReceipt.findById(receiptId);
        if (!receipt) {
            return next(errorHandler(404, "Receipt not found"));
        }
        if (receipt.status === "approved") {
            return next(errorHandler(400, "Approved receipt can't be updated"));
        }
        if (!status) {
            return next(errorHandler(400, "No changes found"));
        }

        if (status) receipt.status = status
        await receipt.save();

        if (status === "approved") {
            await Campaign.findByIdAndUpdate(
                receipt.createdForCampaign,
                { $inc: { collectedAmount: receipt.donatedAmount } },
                { new: true }
            );
            await User.findByIdAndUpdate(
                receipt.createdBy,
                { $inc: { donatedAmount: receipt.donatedAmount } },
                { new: true }
            );
        }

        res.status(200).json({
            success: true,
            message: "Receipt updated successfully"
        });
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default updateReceiptStatus;
