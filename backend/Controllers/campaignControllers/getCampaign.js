import errorHandler from "../../ErrorHandlers/errorHandler.js";
import Campaign from "../../Models/Campaign.js";


const getCampaign = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const campaigns = await Campaign.find({ createdBy: userId });

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
      message: "Campaigns retrieved successfully",
      ...grouped,
      campaigns
    });
  } catch (error) {
    next(errorHandler(500, error.message || "Internal Server Error"));
  }
};

export default getCampaign;