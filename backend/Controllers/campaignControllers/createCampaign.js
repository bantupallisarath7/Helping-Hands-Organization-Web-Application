import errorHandler from "../../ErrorHandlers/errorHandler.js";
import Campaign from "../../Models/Campaign.js";


const createCampaign = async (req, res, next) => {
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
    const userId = req.user.id;
    try {
        const newCampaign = new Campaign({
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
            upi, mobile,
            createdBy: userId
        });
        await newCampaign.save();
        res.status(201).json({
            success: true,
            message: "Your Campaign created successfully"
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default createCampaign;