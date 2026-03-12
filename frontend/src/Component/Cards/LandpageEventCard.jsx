import dayjs from "dayjs";
import { useSelector } from "react-redux";


const LandpageEventCard = ({ event }) => {
  const {
    title,
    description,
    location,
    startTime,
    endTime,
    status,
  } = event;

  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser?.role === "admin";

  const statusColor = () => {
    switch (status) {
      case "upcoming":
        return "bg-yellow-200 text-yellow-900";
      case "live":
        return "bg-green-200 text-green-900";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition text-sm text-gray-800 space-y-4 relative">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-red-800">
          Event Title: <span className="text-gray-900 font-semibold">{title}</span>
        </h3>
      </div>

      <p><span className="text-gray-500 font-semibold">Location:</span> {location}</p>
      <p><span className="text-gray-500 font-semibold">Start Time:</span> {dayjs(startTime).format("DD MMM YYYY, hh:mm A")}</p>
      <p><span className="text-gray-500 font-semibold">End Time:</span> {dayjs(endTime).format("DD MMM YYYY, hh:mm A")}</p>
      <p><span className="text-gray-500 font-semibold">Description:</span> {description}</p>
      <p>
        <span className="text-gray-500 font-semibold">Status:</span>{" "}
        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColor()}`}>
          {status}
        </span>
      </p>
    </div>
  );
};

export default LandpageEventCard;