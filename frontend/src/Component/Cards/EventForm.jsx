import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EventForm = ({ event, type, setAdminView }) => {
  const [formData, setFormData] = useState(
    event
      ? {
        ...event,
        startTime: event.startTime?.slice(0, 16) || "",
        endTime: event.endTime?.slice(0, 16) || "",
      }
      : {
        title: "",
        description: "",
        location: "",
        startTime: "",
        endTime: "",
      }
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser?.role === "admin";

  const validate = () => {
    if (!formData.title.trim()) return setError("Title is required");
    if (!formData.description.trim()) return setError("Description is required");
    if (!formData.location.trim()) return setError("Location is required");
    if (!formData.startTime) return setError("Start time is required");
    if (!formData.endTime) return setError("End time is required");
    if (new Date(formData.endTime) <= new Date(formData.startTime))
      return setError("End time must be after start time");

    setError("");
    return true;
  };

  const onEditEvent = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8815/admin/event/update/${event._id}`,
        { ...formData },
        { withCredentials: true }
      );
      if (res.data.success === false) return toast.error(res.data.message);
      toast.success(res.data.message);
      setAdminView("manage-events");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  const onCreateEvent = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8815/admin/event/add",
        { ...formData },
        { withCredentials: true }
      );
      if (res.data.success === false) return toast.error(res.data.message);
      toast.success(res.data.message);
      setFormData({
        title: "",
        description: "",
        location: "",
        startTime: "",
        endTime: "",
      });
      setAdminView("manage-events");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      type === "edit" ? onEditEvent() : onCreateEvent();
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-4">
        <h2 className="text-lg font-bold text-red-700">
          {event ? "Edit Event" : "Create Event"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm text-gray-800">
          <div>
            <label className="block font-medium text-gray-600">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
              placeholder="Event title"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-600">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
              placeholder="Event location"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-600">Start Time</label>
            <input
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-600">End Time</label>
            <input
              type="datetime-local"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-600">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
              placeholder="Event description"
            />
          </div>

          <div>
            <p className="text-sm mt-2 text-red-600">{error}</p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => setAdminView("manage-events")}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-700"
            >
              {loading ? "Submitting..." : event ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;