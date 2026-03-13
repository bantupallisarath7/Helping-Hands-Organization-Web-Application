import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import LandpageEventCard from "../Cards/LandpageEventCard";

const Events = () => {
  const [allEvents, setAllEvents] = useState({
    upcomingEvents: [],
    liveEvents: [],
    cancelledEvents: []
  });
  const [status, setStatus] = useState("upcoming");
  const [loading, setLoading] = useState(true);

  const fetchAllEvents = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/admin/event/all", {
        withCredentials: true,
      });
      if (res.data.success === false) {
        return toast.error(res.data.message);
      }
      setAllEvents({
        upcomingEvents: [...res.data.upcomingEvents],
        liveEvents: [...res.data.liveEvents],
        cancelledEvents: [...res.data.cancelledEvents],

      });
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const updateEventStatus = async () => {
    try {
      const res = await axios.put(
        "https://api-hho.onrender.com/admin/event/autoupdate/all",
        {},
        { withCredentials: true }
      );
      if (res.data.success === false) {
        return toast.error(res.data.message);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    const syncEvents = async () => {
      await updateEventStatus();
      await fetchAllEvents();
    };
    syncEvents();
  }, []);

  const getEvents = () => {
    switch (status) {
      case "upcoming":
        return allEvents.upcomingEvents;
      case "live":
        return allEvents.liveEvents;
      case "cancelled":
        return allEvents.cancelledEvents;
      default:
        return allEvents.upcomingEvents;
    }
  };

return (
  <div className="flex-1 overflow-y-auto bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Heading */}
      <div className="text-center sm:text-left">

        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          Events
        </h2>

        <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-2xl">
          Discover upcoming, live, and past events organized to support students
          and strengthen our community.
        </p>

      </div>


      {/* Status Filters */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-3">

        <button
          onClick={() => setStatus("upcoming")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition shadow-sm
          ${
            status === "upcoming"
              ? "bg-yellow-200 text-gray-900"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-yellow-200"
          }`}
        >
          Upcoming
        </button>

        <button
          onClick={() => setStatus("live")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition shadow-sm
          ${
            status === "live"
              ? "bg-green-200 text-gray-900"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-green-200"
          }`}
        >
          Live
        </button>

        <button
          onClick={() => setStatus("cancelled")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition shadow-sm
          ${
            status === "cancelled"
              ? "bg-red-200 text-gray-900"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-red-200"
          }`}
        >
          Cancelled
        </button>

      </div>


      {/* Events Section */}
      <div className="min-h-[60vh] flex flex-col">

        {loading ? (

          <div className="flex flex-1 flex-col items-center justify-center">

            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-900"></div>

            <p className="text-gray-500 text-sm mt-4">
              Loading events...
            </p>

          </div>

        ) : getEvents().length === 0 ? (

          /* Empty State */
          <div className="flex flex-1 flex-col items-center justify-center text-center">

            <div className="text-6xl mb-4">🗓️</div>

            <h3 className="text-xl sm:text-2xl font-semibold text-red-900 mb-2">
              No {status} events found
            </h3>

            <p className="text-gray-500 max-w-md text-sm sm:text-base">
              It looks like there are no events in this category right now.
              Please check back later or try refreshing.
            </p>

            <button
              onClick={() => {
                setLoading(true);
                updateEventStatus().then(fetchAllEvents);
              }}
              className="mt-6 px-6 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-800 transition shadow-sm font-medium"
            >
              Refresh Events
            </button>

          </div>

        ) : (

          /* Events Grid */
          <div
            className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            items-start
          "
          >

            {getEvents().map((event) => (
              <div key={event._id} className="flex justify-center">

                <LandpageEventCard event={event} />

              </div>
            ))}

          </div>

        )}

      </div>

    </div>

  </div>
);
};

export default Events;