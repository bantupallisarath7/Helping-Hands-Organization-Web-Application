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
    <div className="flex flex-col mt-4 px-4 sm:px-6 lg:px-8">

      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-6 w-full">
        <h2 className="text-lg sm:text-xl font-bold text-red-900 text-center sm:text-left">
          Events
        </h2>

        <p className="text-gray-500 text-sm sm:text-base text-center sm:text-left mt-1">
          Discover upcoming, live, and past events organized to support students and strengthen our community.
        </p>
      </div>

      {/* Status Filter Buttons */}
      <div className="max-w-7xl mx-auto w-full flex flex-wrap justify-center sm:justify-start gap-3 mb-6">

        <button
          className={`px-4 py-2 rounded-full text-sm transition shadow-sm
        ${status === "upcoming"
              ? "bg-yellow-200 text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-yellow-200 hover:text-gray-900"
            }`}
          onClick={() => setStatus("upcoming")}
        >
          Upcoming
        </button>

        <button
          className={`px-4 py-2 rounded-full text-sm transition shadow-sm
        ${status === "live"
              ? "bg-green-200 text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-green-200 hover:text-gray-900"
            }`}
          onClick={() => setStatus("live")}
        >
          Live
        </button>

        <button
          className={`px-4 py-2 rounded-full text-sm transition shadow-sm
        ${status === "cancelled"
              ? "bg-red-200 text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-red-200 hover:text-gray-900"
            }`}
          onClick={() => setStatus("cancelled")}
        >
          Cancelled
        </button>

      </div>

      {/* Events Section */}
      <div className="flex-1 overflow-y-auto py-4 max-w-7xl mx-auto w-full">

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-700"></div>
          </div>
        ) : getEvents().length === 0 ? (

          /* Empty State */
          <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="text-6xl mb-4">🗓️</div>

            <h3 className="text-xl sm:text-2xl font-semibold text-red-900 mb-2">
              No {status} events found
            </h3>

            <p className="text-sm sm:text-base text-gray-500 max-w-md">
              It looks like there are no events in this category right now.
              Please check back later or try refreshing.
            </p>

            <button
              onClick={() => {
                setLoading(true);
                updateEventStatus().then(fetchAllEvents);
              }}
              className="mt-6 px-5 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-700 transition shadow"
            >
              Refresh Events
            </button>
          </div>

        ) : (

          /* Event Cards Grid */
          <div
            className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-3
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
  );
};

export default Events;