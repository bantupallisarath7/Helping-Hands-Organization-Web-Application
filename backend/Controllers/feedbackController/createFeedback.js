import Feedback from "../../Models/Feedback.js"
import errorHandler from "../../ErrorHandlers/errorHandler.js"

const creatFeedback = async (req, res, next) => {
    const { description, reviewer } = req.body
    try {
        const feedback = new Feedback({ description, reviewer });
        await feedback.save();
        res.status(200).json({
            success: true,
            message: "Feedback created successfully",
        })
    } catch (error) {
        next(errorHandler(500, error.messaage || "Internal Server Error"))
    }
}
export default creatFeedback;