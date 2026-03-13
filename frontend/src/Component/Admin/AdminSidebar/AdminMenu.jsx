import {
  MdDashboard,
  MdCampaign,
  MdAssignmentTurnedIn,
  MdPeople,
  MdPerson,
  MdLogout,
  MdImage,
  MdEvent,
  MdHome,
} from "react-icons/md";
import { FaReceipt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../../../../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const AdminMenu = ({ setAdminView, activeView, setSelectedUserId }) => {
  const dispatch = useDispatch();

  const onSignout = async () => {
    try {
      dispatch(signOutStart());

      const res = await axios.post(
        "https://api-hho.onrender.com/auth/signout",
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        dispatch(signOutFailure(res.data.message));
        return;
      }

      toast.success(res.data.message);
      dispatch(signOutSuccess());
      setAdminView("signin");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(errorMsg);
      dispatch(signOutFailure(error));
    }
  };

const menuItem =
  "flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-red-50 hover:text-red-900";

const activeItem = "bg-red-100 text-red-900 font-semibold";

return (
  <>
    <aside className="w-64 min-h-screen bg-white shadow-md p-6">

      {/* Title */}
      <h2 className="text-lg font-bold text-red-900 mb-6">
        Admin Panel
      </h2>

      <div className="flex flex-col gap-2 text-gray-700 font-medium">

        <button
          onClick={() => setAdminView("admin-home")}
          className={`${menuItem} ${activeView === "admin-home" && activeItem}`}
        >
          <MdDashboard className="text-lg" />
          Home
        </button>

        <button
          onClick={() => setAdminView("landingpage-home")}
          className={`${menuItem} ${activeView === "landingpage-home" && activeItem}`}
        >
          <MdHome className="text-lg" />
          Landing Page
        </button>

        <button
          onClick={() => setAdminView("manage-campaigns")}
          className={`${menuItem} ${activeView === "manage-campaigns" && activeItem}`}
        >
          <MdCampaign className="text-lg" />
          Manage Campaigns
        </button>

        <button
          onClick={() => setAdminView("applications")}
          className={`${menuItem} ${activeView === "applications" && activeItem}`}
        >
          <MdAssignmentTurnedIn className="text-lg" />
          Applications
        </button>

        <button
          onClick={() => setAdminView("admin-donation-receipts")}
          className={`${menuItem} ${
            activeView === "admin-donation-receipts" && activeItem
          }`}
        >
          <FaReceipt className="text-lg" />
          Donation Receipts
        </button>

        <button
          onClick={() => setAdminView("manage-gallery")}
          className={`${menuItem} ${activeView === "manage-gallery" && activeItem}`}
        >
          <MdImage className="text-lg" />
          Manage Gallery
        </button>

        <button
          onClick={() => setAdminView("manage-events")}
          className={`${menuItem} ${activeView === "manage-events" && activeItem}`}
        >
          <MdEvent className="text-lg" />
          Manage Events
        </button>

        <button
          onClick={() => setAdminView("manage-users")}
          className={`${menuItem} ${activeView === "manage-users" && activeItem}`}
        >
          <MdPeople className="text-lg" />
          Manage Users
        </button>

        <button
          onClick={() => {
            setSelectedUserId(null);
            setAdminView("admin-profile");
          }}
          className={`${menuItem} ${activeView === "admin-profile" && activeItem}`}
        >
          <MdPerson className="text-lg" />
          Profile
        </button>

        <hr className="my-3" />

        <button
          onClick={onSignout}
          className={`${menuItem} text-red-800 hover:bg-red-100`}
        >
          <MdLogout className="text-lg" />
          Sign out
        </button>

      </div>

    </aside>
    {signoutLoading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

        <div className="bg-white rounded-xl shadow-lg px-8 py-6 flex flex-col items-center gap-4">

          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-900"></div>

          <p className="text-gray-700 font-medium">
            Signing you out...
          </p>

        </div>

      </div>
    )}
  </>
);
};

export default AdminMenu;