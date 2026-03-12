import Campaign from "../../Models/Campaign.js";
import errorHandler from "../../ErrorHandlers/errorHandler.js"
const getAllCampaigns = async (req, res, next) => {
    try {
        const campaigns = await Campaign.find().sort({ createdAt: -1 });
        const grouped = {
            pendingCampaigns: [],
            approvedCampaigns: [],
            rejectedCampaigns: [],
            fundedCampaigns: [],
        };

        campaigns.forEach(camp => {
            switch (camp.status) {
                case 'pending':
                    grouped.pendingCampaigns.push(camp);
                    break;
                case 'approved':
                    grouped.approvedCampaigns.push(camp);
                    break;
                case 'rejected':
                    grouped.rejectedCampaigns.push(camp);
                    break;
                case 'funded':
                    grouped.fundedCampaigns.push(camp);
                    break;
                default:
                    break;
            }
        });

        res.status(200).json({
            success: true,
            message: campaigns.length > 0
                ? "All campaigns retrieved successfully"
                : "No campaigns found",
            ...grouped,
            campaigns
        });
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"))
    }
}
export default getAllCampaigns;