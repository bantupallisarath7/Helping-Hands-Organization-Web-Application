import errorHandler from "../../ErrorHandlers/errorHandler.js"
import Event from "../../Models/Event.js"

const deleteEvent = async (req, res, next) => {
    const { eventId } = req.params
    try {
        if (req.user.role !== "admin") {
            return next(errorHandler(403, "Only admins can delete"));
        }
        const event = await Event.findById(eventId);
        if (!event) {
            return next(errorHandler(404, "Event not found"));
        }
        if (event.status === "completed") {
            return next(errorHandler(400, "Completed events cannot be deleted"));
        }
        await event.deleteOne();
        res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"))
    }
}
export default deleteEvent;