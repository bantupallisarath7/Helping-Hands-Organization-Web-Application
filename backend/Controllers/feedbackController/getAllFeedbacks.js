import errorHandler from "../../ErrorHandlers/errorHandler.js"
import Feedback from "../../Models/Feedback.js"
const getAllFeedbacks = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Feedbacks retrived successfully",
            feedbacks
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server error"))
    }
}
export default getAllFeedbacks;