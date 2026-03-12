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
  <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-6">

    {/* Header */}
    <div className="max-w-7xl mx-auto w-full">
      <h2 className="text-lg sm:text-xl font-bold text-red-900 text-center sm:text-left">
        Manage Events
      </h2>

      <p className="text-gray-500 text-sm sm:text-base text-center sm:text-left mt-1 max-w-2xl">
        Manage and monitor all events created on the platform.
      </p>
    </div>

    {/* Filter Buttons */}
    <div className="max-w-7xl mx-auto w-full flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start font-medium">

      <button
        onClick={() => setStatus("all")}
        className={`px-4 py-2 rounded-full text-sm transition ${
          status === "all"
            ? "bg-blue-200 text-gray-900"
            : "bg-gray-100 text-gray-700 hover:bg-blue-200 hover:text-gray-900"
        }`}
      >
        All
      </button>

      <button
        onClick={() => setStatus("upcoming")}
        className={`px-4 py-2 rounded-full text-sm transition ${
          status === "upcoming"
            ? "bg-yellow-200 text-gray-900"
            : "bg-gray-100 text-gray-700 hover:bg-yellow-200 hover:text-gray-900"
        }`}
      >
        Upcoming
      </button>

      <button
        onClick={() => setStatus("live")}
        className={`px-4 py-2 rounded-full text-sm transition ${
          status === "live"
            ? "bg-green-200 text-gray-900"
            : "bg-gray-100 text-gray-700 hover:bg-green-200 hover:text-gray-900"
        }`}
      >
        Live
      </button>

      <button
        onClick={() => setStatus("completed")}
        className={`px-4 py-2 rounded-full text-sm transition ${
          status === "completed"
            ? "bg-orange-200 text-gray-900"
            : "bg-gray-100 text-gray-700 hover:bg-orange-200 hover:text-gray-900"
        }`}
      >
        Completed
      </button>

      <button
        onClick={() => setStatus("cancelled")}
        className={`px-4 py-2 rounded-full text-sm transition ${
          status === "cancelled"
            ? "bg-red-200 text-gray-900"
            : "bg-gray-100 text-gray-700 hover:bg-red-200 hover:text-gray-900"
        }`}
      >
        Cancelled
      </button>

    </div>

    {/* Events Section */}
    <div className="max-w-7xl mx-auto w-full flex-1 py-4">

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-200 border-t-red-700"></div>
        </div>

      ) : getEvents().length === 0 ? (

        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="text-6xl mb-4">🗓️</div>

          <h3 className="text-xl sm:text-2xl font-semibold text-red-900 mb-2">
            No {status === "all" ? "events" : status + " events"} found
          </h3>

          <p className="text-sm sm:text-base text-gray-500 max-w-md">
            {status === "all"
              ? "There are no events available at the moment."
              : `There are no ${status} events right now.`}
          </p>

          <button
            onClick={() => {
              setLoading(true);
              fetchAllEvents();
            }}
            className="mt-6 px-5 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-700 transition shadow"
          >
            Refresh Events
          </button>
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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

    </div>

    {/* Floating Add Button */}
    <button
      title="Add Event"
      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-red-900 hover:bg-red-700 fixed right-6 bottom-6 shadow-lg"
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