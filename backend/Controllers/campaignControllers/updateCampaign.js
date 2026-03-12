import errorHandler from "../../ErrorHandlers/errorHandler.js";
import Campaign from "../../Models/Campaign.js";

const updateCampaign = async (req, res, next) => {
    const {
        title,
        recipient,
        student,
        category,
        description,
        amount,
        deadline,
        accountHolder,
        accountNumber,
        ifsc,
        upi,
        mobile,
    } = req.body;
    const { campaignId } = req.params;

    try {
        const campaign = await Campaign.findById(campaignId);
        const isAdmin = req.user.role === "admin";
        if (!campaign) {
            return next(errorHandler(404, "Campaign not found"));
        }
        if (req.user.id !== campaign.createdBy.toString() && req.user.role !== "admin") {
            return next(errorHandler(403, "Unauthorized"));
        }

        if (campaign.status === "approved" && !isAdmin) {
            return next(errorHandler(400, "Approved campaign can't be updated"));
        }

        if (campaign.status === "funded") {
            return next(errorHandler(400, "Funded campaign can't be updated"));
        }

        if (
            !title &&
            !recipient &&
            !student &&
            !description &&
            !amount &&
            !deadline &&
            !category &&
            !documents &&
            !accountHolder &&
            !accountNumber &&
            !ifsc &&
            !upi &&
            !mobile
        ) {
            return next(errorHandler(400, "No changes found"));
        }

        if (title) campaign.title = title;
        if (recipient) campaign.recipient = recipient;
        if (student) campaign.student = student;
        if (description) campaign.description = description;
        if (amount) campaign.amount = amount;
        if (deadline) campaign.deadline = deadline;
        if (category) campaign.category = category;
        if (accountHolder) campaign.accountHolder = accountHolder;
        if (accountNumber) campaign.accountNumber = accountNumber;
        if (ifsc) campaign.ifsc = ifsc;
        if (upi) campaign.upi = upi;
        if (mobile) campaign.mobile = mobile;

        await campaign.save();

        res.status(200).json({
            success: true,
            message: "Campaign updated successfully"
        });
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
};

export default updateCampaign;