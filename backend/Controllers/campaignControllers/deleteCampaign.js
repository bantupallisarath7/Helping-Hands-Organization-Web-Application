import errorHandler from "../../ErrorHandlers/errorHandler.js";
import Campaign from "../../Models/Campaign.js";


const deleteCampaign = async (req, res, next) => {
    const { campaignId } = req.params;
    try {
        const campaign = await Campaign.findById(campaignId);

        if (!campaign) {
            return next(errorHandler(404, "Campaign not found"));
        }
        const isOwner = campaign.createdBy.toString() === req.user.id;
        const isAdmin = req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return next(errorHandler(403, "Unauthorized"));
        }


        if (campaign.status === "approved" && !isAdmin) {
            return next(errorHandler(400, "Campaign is already approved and can't be deleted"));
        }
        if (campaign.status === "funded") {
            return next(errorHandler(400, "Funded Campaign  cannot be deleted"));
        }

        await campaign.deleteOne();
        res.status(200).json({
            success: true,
            message: "Campaign deleted successfully"
        });
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default deleteCampaign;