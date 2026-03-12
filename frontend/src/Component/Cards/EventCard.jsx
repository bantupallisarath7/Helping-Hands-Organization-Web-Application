import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EventCard = ({ event, setDashboardView, setFormMode, setEditEvent, refreshEvents }) => {
  const {
    title,
    description,
    location,
    startTime,
    endTime,
    status,
    updatedAt,
  } = event;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onEdit = () => {
    setFormMode("edit");
    setEditEvent(event);
    setDashboardView("admin-event-form");
  };

  const onDelete = async () => {
    try {
      const res = await axios.delete(`https://api-hho.onrender.com/admin/event/delete/${event._id}`, {
        withCredentials: true,
      });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
      toast.success(res.data.message);
      refreshEvents();
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  const onCancelEvent = async () => {
    try {
      const res = await axios.put(`https://api-hho.onrender.com/admin/event/update/status/${event._id}`, { status: "cancelled" }, {
        withCredentials: true,
      });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
      toast.success(res.data.message);
      refreshEvents();
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };



  const statusColor = () => {
    switch (status) {
      case "upcoming":
        return "bg-yellow-200 text-yellow-900";
      case "live":
        return "bg-green-200 text-green-900";
      case "completed":
        return "bg-blue-200 text-blue-900";
      case "cancelled":
        return "bg-red-200 text-red-900";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

return (
  <div className="bg-white shadow-md rounded-lg 
                  p-4 sm:p-6 border border-gray-200 
                  hover:shadow-lg transition 
                  text-xs sm:text-sm md:text-base text-gray-800 
                  space-y-4 w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto relative">
    <div className="flex justify-between items-start">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-red-800">
        Event Title:{" "}
        <span className="text-gray-900 font-semibold">{title}</span>
      </h3>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-gray-600 hover:text-gray-800 font-bold text-lg"
          title="Options"
        >
          <FaEllipsisV className="text-gray-600 text-sm hover:text-red-800" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-10">
            {status !== "cancelled" && (
              <button
                onClick={() => {
                  onEdit();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => {
                onDelete();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white"
            >
              Delete
            </button>
            {status !== "cancelled" && (
              <button
                onClick={() => {
                  onCancelEvent();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white"
              >
                Cancel Event
              </button>
            )}
          </div>
        )}
      </div>
    </div>

    <p>
      <span className="text-gray-500 font-semibold">Location:</span> {location}
    </p>
    <p>
      <span className="text-gray-500 font-semibold">Start Time:</span>{" "}
      {dayjs(startTime).format("DD MMM YYYY, hh:mm A")}
    </p>
    <p>
      <span className="text-gray-500 font-semibold">End Time:</span>{" "}
      {dayjs(endTime).format("DD MMM YYYY, hh:mm A")}
    </p>
    <p>
      <span className="text-gray-500 font-semibold">Description:</span>{" "}
      {description}
    </p>
    <p>
      <span className="text-gray-500 font-semibold">Status:</span>{" "}
      <span
        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColor()}`}
      >
        {status}
      </span>
    </p>
  </div>
);
};

export default EventCard;