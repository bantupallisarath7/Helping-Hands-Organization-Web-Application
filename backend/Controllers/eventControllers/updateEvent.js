import errorHandler from "../../ErrorHandlers/errorHandler.js"
import Event from "../../Models/Event.js"

const updateEvent = async (req, res, next) => {
    const {
        title,
        description,
        location,
        startTime,
        endTime,
    } = req.body
    const { eventId } = req.params
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return next(errorHandler(404, "Event not found"));
        }
        if (req.user.role !== "admin") {
            return next(errorHandler(403, "Only admins can update events"));
        }
        if (event.status === "completed") {
            return next(errorHandler(400, "Completed events cannot be updated"));
        }
        if (!title && !description && !location && !startTime && !endTime) {
            return next(errorHandler(401, "No changes found"));
        }
        if (title) event.title = title
        if (description) event.description = description
        if (location) event.location = location
        if (startTime) event.startTime = startTime
        if (endTime) event.endTime = endTime

        await event.save();
        res.status(200).json({
            success: true,
            message: "Event updated successfully"
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default updateEvent;