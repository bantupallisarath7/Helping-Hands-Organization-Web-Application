import Event from "../../Models/Event.js";
import errorHandler from "../../ErrorHandlers/errorHandler.js";

const updateEventStatuses = async (req, res, next) => {
    const { status } = req.body
    const { eventId } = req.params;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return next(errorHandler(404, "Event not found"));
        }
        if (req.user.role !== "admin") {
            return next(errorHandler(403, "Only Admin can update status"));
        }
        if (event.status === "completed") {
            return next(errorHandler(400, "Completed events cannot be updated"));
        }
        if (!status) {
            return next(errorHandler(400, "No changes found"));
        }

        if (status) event.status = status

        await event.save();
        res.status(200).json({
            success: true,
            message: "Event updated successfully"
        });
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
};

export default updateEventStatuses;