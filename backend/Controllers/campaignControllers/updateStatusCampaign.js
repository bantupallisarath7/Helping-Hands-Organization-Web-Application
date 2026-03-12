import errorHandler from "../../ErrorHandlers/errorHandler.js";
import Campaign from "../../Models/Campaign.js";

const updateStatusCampaign = async (req, res, next) => {
    const { status } = req.body
    const { campaignId } = req.params;
    try {
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return next(errorHandler(404, "Campaign not found"));
        }
        if (campaign.status === "funded") {
            return next(errorHandler(400, "Funded campaign can't be updated"));
        }
        if (!status) {
            return next(errorHandler(400, "No changes found"));
        }

        if (status) campaign.status = status

        await campaign.save();
        res.status(200).json({
            success: true,
            message: "Campaign updated successfully"
        });
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default updateStatusCampaign;
