import errorHandler from "../../ErrorHandlers/errorHandler.js";
import DonationReceipt from "../../Models/DonationReceipt.js";


const updateDonationReceipt = async (req, res, next) => {
    const {
        donorName,
        campaignTitle,
        requestedStudent,
        transactionId,
        donatedAmount,
        donationDate
    } = req.body;
    const { receiptId } = req.params;
    try {
        const receipt = await DonationReceipt.findById(receiptId);
        if (!receipt) {
            return next(errorHandler(401, "Donation Receipt not found"));
        }
        if (receipt.status === "approved") {
            return next(errorHandler(400, "Donation Receipt already approved and cannot be updated"))
        }

        if (!donorName && !campaignTitle && !requestedStudent && !transactionId && !donatedAmount && !donationDate) {
            return next(errorHandler(400, "No changes found"));
        }

        if (donorName) receipt.donorName = donorName;
        if (campaignTitle) receipt.campaignTitle = campaignTitle;
        if (requestedStudent) receipt.requestedStudent = requestedStudent;
        if (transactionId) receipt.transactionId = transactionId;
        if (donatedAmount) receipt.amount = donatedAmount;
        if (donationDate) receipt.donationDate = donationDate;

        await receipt.save();
        res.status(200).json({
            success: true,
            message: "Updated successfully"
        });

    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default updateDonationReceipt;