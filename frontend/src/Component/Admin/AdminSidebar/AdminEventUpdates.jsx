import { useEffect, useState } from "react";
import EventCard from "../../Cards/EventCard";
import { toast } from "react-toastify";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const AdminEventUpdates = ({ setAdminView, setFormMode, setEditEvent }) => {
  const [allEvents, setAllEvents] = useState({
    allEvents: [],
    upcomingEvents: [],
    liveEvents: [],
    completedEvents: [],
    cancelledEvents: []
  });
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchAllEvents = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/admin/event/all", { withCredentials: true });
      if (res.data.status === false) {
        return toast.error(res.data.message)
      }
      setAllEvents({
        allEvents: [...res.data.events],
        upcomingEvents: [...res.data.upcomingEvents],
        liveEvents: [...res.data.liveEvents],
        completedEvents: [...res.data.completedEvents],
        cancelledEvents: [...res.data.cancelledEvents]
      })
      // toast.success(res.data.message)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }
  const updateEventStatus = async () => {
    try {
      const res = await axios.put("https://api-hho.onrender.com/admin/event/autoupdate/all", {}, { withCredentials: true });
      if (res.data.status === false) {
        return toast.error(res.data.message)
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }

  useEffect(() => {
    const syncEvents = async () => {
      await updateEventStatus();
      await fetchAllEvents();
    };
    syncEvents();
  }, [])

  const getEvents = () => {
    switch (status) {
      case "upcoming":
        return allEvents.upcomingEvents;
      case "live":
        return allEvents.liveEvents;
      case "completed":
        return allEvents.completedEvents;
      case "cancelled":
        return allEvents.cancelledEvents;
      case "all":
        return allEvents.allEvents;
      default:
        return allEvents.allEvents;
    }
  };

return (
  <div className="flex-1 overflow-y-auto bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Header */}
      <section className="text-center sm:text-left">

        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          Manage Events
        </h2>

        <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-2xl">
          Manage and monitor all events created on the platform.
        </p>

      </section>


      {/* Filter Buttons */}
      <section>

        <div className="flex flex-wrap gap-3 justify-center sm:justify-start font-medium">

          <button
            onClick={() => setStatus("all")}
            className={`px-4 py-2 rounded-full text-sm transition
            ${status === "all"
                ? "bg-red-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
          >
            All
          </button>

          <button
            onClick={() => setStatus("upcoming")}
            className={`px-4 py-2 rounded-full text-sm transition
            ${status === "upcoming"
                ? "bg-yellow-500 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
          >
            Upcoming
          </button>

          <button
            onClick={() => setStatus("live")}
            className={`px-4 py-2 rounded-full text-sm transition
            ${status === "live"
                ? "bg-green-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
          >
            Live
          </button>

          <button
            onClick={() => setStatus("completed")}
            className={`px-4 py-2 rounded-full text-sm transition
            ${status === "completed"
                ? "bg-orange-500 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
          >
            Completed
          </button>

          <button
            onClick={() => setStatus("cancelled")}
            className={`px-4 py-2 rounded-full text-sm transition
            ${status === "cancelled"
                ? "bg-red-500 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
          >
            Cancelled
          </button>

        </div>

      </section>


      {/* Events Section */}
      <section className="min-h-[60vh]">

        {loading ? (

          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">

            {/* Spinner  */}
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-900"></div>

            <p className="text-gray-500 text-sm sm:text-base font-medium">
              Loading events...
            </p>

          </div>

        ) : getEvents().length === 0 ? (

          <div className="flex flex-col items-center justify-center py-20 text-center">

            <div className="text-6xl mb-4">🗓️</div>

            <h3 className="text-xl sm:text-2xl font-semibold text-red-900 mb-2">
              No {status === "all" ? "events" : status + " events"} found
            </h3>

            <p className="text-gray-500 text-sm max-w-md">
              {status === "all"
                ? "There are no events available at the moment."
                : `There are no ${status} events right now.`}
            </p>

            <button
              onClick={() => {
                setLoading(true);
                fetchAllEvents();
              }}
              className="mt-6 px-6 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-800 transition shadow-sm font-medium"
            >
              Refresh Events
            </button>

          </div>

        ) : (

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

            {getEvents().map((event) => (
              <EventCard
                key={event._id}
                event={event}
                setDashboardView={setAdminView}
                setFormMode={setFormMode}
                setEditEvent={setEditEvent}
                refreshEvents={fetchAllEvents}
              />
            ))}

          </div>

        )}

      </section>

    </div>

    <button
      title="Add Event"
      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-red-900 hover:bg-red-800 fixed right-6 bottom-6 shadow-lg transition"
      onClick={() => {
        setEditEvent(null);
        setAdminView("admin-event-form");
      }}
    >
      <FaPlus className="text-2xl text-white" />
    </button>

  </div>
);
}
export default AdminEventUpdates;