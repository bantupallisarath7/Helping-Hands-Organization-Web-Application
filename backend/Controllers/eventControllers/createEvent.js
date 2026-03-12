import Event from "../../Models/Event.js"
import errorHandler from "../../ErrorHandlers/errorHandler.js"

const createEvent = async (req, res, next) => {
    const {
        title,
        description,
        location,
        startTime,
        endTime,
    } = req.body
    try {
        const event = new Event({
            title,
            description,
            location,
            startTime,
            endTime,
            createdBy: req.user.id
        })

        if (req.user.role !== "admin") {
            return next(errorHandler(403, "Only admin can create events"))
        }
        await event.save();
        res.status(200).json({
            success: true,
            message: "Event created successfully"
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"))
    }
}
export default createEvent;