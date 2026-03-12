import errorHandler from "../../ErrorHandlers/errorHandler.js"
import Feedback from "../../Models/Feedback.js";

const updateFeedback = async (req, res, next) => {
    const { description, reviewer } = req.body
    const feedbackId = req.params
    try {
        const feedback = await Feedback.findById(feedbackId);
        if (!feedback) {
            return next(errorHandler(404, "Feedback not found"))
        }
        if (req.user.role !== "admin") {
            return next(errorHandler(403, "Only Admin can update feedback"))
        }
        if (!description && !reviewer) {
            return next(errorHandler(402, "No changes found"))
        }
        feedback.description = description;
        feedback.reviewer = reviewer;

        await feedback.save()
        res.status(200).json({
            success: true,
            message: "Feedback Updated Successfully"
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default updateFeedback;