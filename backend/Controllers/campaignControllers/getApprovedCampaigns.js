import errorHandler from "../../ErrorHandlers/errorHandler.js";
import Campaign from "../../Models/Campaign.js"

const getApprovedCampaigns = async (req, res, next) => {
    try {
        const approvedCampaigns = await Campaign.find({ status: "approved" }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: approvedCampaigns.length > 0
                ? "All campaigns retrieved successfully"
                : "No campaigns found",
            approvedCampaigns
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"))
    }
}
export default getApprovedCampaigns;