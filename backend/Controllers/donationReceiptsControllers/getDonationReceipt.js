import errorHandler from "../../ErrorHandlers/errorHandler.js";
import DonationReceipt from "../../Models/DonationReceipt.js";

const getDonationReceipt = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const receipts = await DonationReceipt.find({ createdBy: userId }).sort({ createdAt: -1 });
    const grouped = {
      pendingDonationReceipts: [],
      approvedDonationReceipts: [],
      rejectedDonationReceipts: [],
    };
    if (receipts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No donation receipts found",
        pendingDonationReceipts: [],
        approvedDonationReceipts: [],
        rejectedDonationReceipts: [],
        receipts: []
      });
    }

    receipts.forEach((receipt) => {
      switch (receipt.status) {
        case "pending":
          grouped.pendingDonationReceipts.push(receipt);
          break;
        case "approved":
          grouped.approvedDonationReceipts.push(receipt);
          break;
        case "rejected":
          grouped.rejectedDonationReceipts.push(receipt);
          break;
        default:
          break;
      }
    });

    res.status(200).json({
      success: true,
      message: "Transactions retrieved successfully",
      ...grouped,
      receipts
    });
  } catch (error) {
    next(errorHandler(500, error.message || "Internal Server Error"));
  }
};

export default getDonationReceipt;