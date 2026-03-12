import Event from "../../Models/Event.js";
import errorHandler from "../../ErrorHandlers/errorHandler.js";

const autoUpdateEventStatuses = async (req, res, next) => {
    try {
        const now = new Date();

        const events = await Event.find();

        const updatePromises = events.map(event => {
            let newStatus = event.status;

            if (event.startTime > now) {
                newStatus = "upcoming";
            } else if (event.startTime <= now && event.endTime >= now) {
                newStatus = "live";
            } else if (event.endTime < now) {
                newStatus = "completed";
            }

            if (newStatus !== event.status) {
                event.status = newStatus;
                return event.save();
            }

            return Promise.resolve(); // No change needed
        });

        await Promise.all(updatePromises);

        res.status(200).json({
            success: true,
            message: "Event statuses updated based on time"
        });
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
};

export default autoUpdateEventStatuses;