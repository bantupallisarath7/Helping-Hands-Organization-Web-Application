import errorHandler from "../../ErrorHandlers/errorHandler.js";
import DonationReceipt from "../../Models/DonationReceipt.js"
const getAllDonationReceipts = async (req, res, next) => {
    try {
        const receipts = await DonationReceipt.find();
        const grouped = {
            pendingReceipts: [],
            approvedReceipts: [],
            rejectedReceipts: [],
        };

        receipts.forEach(rcp => {
            switch (rcp.status) {
                case 'pending':
                    grouped.pendingReceipts.push(rcp);
                    break;
                case 'approved':
                    grouped.approvedReceipts.push(rcp);
                    break;
                case 'rejected':
                    grouped.rejectedReceipts.push(rcp);
                    break;
                default:
                    break;
            }
        });

        res.status(200).json({
            success: true,
            message: receipts.length > 0
                ? "All receiptss retrieved successfully"
                : "No receipts found",
            ...grouped,
            receipts
        });
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"))
    }
}
export default getAllDonationReceipts;