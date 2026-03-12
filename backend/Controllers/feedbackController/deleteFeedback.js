import errorHandler from "../../ErrorHandlers/errorHandler.js"
import Feedback from "../../Models/Feedback.js"

const deleteFeedback = async (req, res, next) => {
    const { feedbackId } = req.params
    try {
        const feedback = await Feedback.findByIdAndDelete(feedbackId);
        if (!feedback) {
            return next(errorHandler(404, "Feedback not found"))
        }
        res.status(200).json({
            success: true,
            message: "Feedback deleted successfully",
        })
    } catch (error) {
        next(errorHandler(500, error.message || 'Internal server Error'))
    }
}
export default deleteFeedback;