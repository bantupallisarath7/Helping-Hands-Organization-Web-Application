import errorHandler from "../../ErrorHandlers/errorHandler.js";
import Event from "../../Models/Event.js"

const getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        const group = {
            upcomingEvents: [],
            liveEvents: [],
            completedEvents: [],
            cancelledEvents: []
        }
        events.forEach((event) => {
            switch (event.status) {
                case "upcoming":
                    group.upcomingEvents.push(event);
                    break
                case "live":
                    group.liveEvents.push(event);
                    break
                case "completed":
                    group.completedEvents.push(event);
                    break
                case "cancelled":
                    group.cancelledEvents.push(event);
                    break
            }
        })
        res.status(200).json({
            success: true,
            message: "all Events are retrieved successfully",
            ...group,
            events
        })
    } catch (error) {
        next(errorHandler(500, error.message || "Internal Server Error"));
    }
}
export default getAllEvents;