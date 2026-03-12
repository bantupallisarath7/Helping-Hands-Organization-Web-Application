import Campaign from "../../Models/Campaign.js"
import errorHandler from "../../ErrorHandlers/errorHandler.js"

const updateIsEmergency = async (req, res, next) => {
    const { isEmergency } = req.body
    const { campaignId } = req.params
    try {
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return next(errorHandler(404, "Not found"));
        }
        if (req.user.role !== "admin") {
            return next(errorHandler(403, "Only admin can updated emergency status"));
        }
        if (campaign.status !== "approved") {
            return next(errorHandler(401, "Only approved campaigns can be marked as emergency"))
        }
        campaign.isEmergency = isEmergency
        await campaign.save()
        res.status(200).json({
            success: true,
            message: "Emergency status successfully updated"
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default updateIsEmergency;