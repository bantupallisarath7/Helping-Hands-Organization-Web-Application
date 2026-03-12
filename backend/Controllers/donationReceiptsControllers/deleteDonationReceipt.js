import errorHandler from "../../ErrorHandlers/errorHandler.js";
import DonationReceipt from "../../Models/DonationReceipt.js";

const deleteDonationReceipt = async (req, res, next) => {
    const { receiptId } = req.params;
    try {
        const donationReceipt = await DonationReceipt.findById(receiptId);
        const isOwner = donationReceipt.createdBy.toString() === req.user.id;
        const isAdmin = req.user.role === "admin";
        if (!donationReceipt) {
            return next(errorHandler(404, "Donation Receipt not found"));
        }
        if (!isOwner && !isAdmin) {
            return next(errorHandler(403, "Unauthorized"));
        }
        if (donationReceipt.status === "approved") {
            return next(errorHandler(400, "Donation Receipt already approved and cannot be deleted"));
        }
        await donationReceipt.deleteOne();
        res.status(200).json({
            success: true,
            message: "Donation Receipt deleted successfully"
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default deleteDonationReceipt;