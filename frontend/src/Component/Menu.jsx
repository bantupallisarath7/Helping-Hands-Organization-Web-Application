import {
  MdFavorite,
  MdCampaign,
  MdAssignment,
  MdPerson,
  MdLogout,
} from "react-icons/md";
import { FaReceipt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const Menu = ({ setView, activeView, setFormMode, setEditCampaign }) => {
  const dispatch = useDispatch();
  const [signoutLoading, setSignoutLoading] = useState(false);

  const onSignout = async () => {
    try {
      setSignoutLoading(true);
      dispatch(signOutStart());

      const res = await axios.post(
        "https://api-hho.onrender.com/auth/signout",
        {},
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        dispatch(signOutFailure(res.data.message));
        setSignoutLoading(false);
        return;
      }

      dispatch(signOutSuccess());
      toast.success(res.data.message);
      setView("signin");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
      dispatch(signOutFailure(errorMsg));
    } finally {
      setSignoutLoading(false);
    }
  };

  const menuItem =
    "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 transition hover:bg-red-50 hover:text-red-900";

  const activeItem = "bg-red-100 text-red-900 font-semibold";

  return (
    <>
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm p-6 flex flex-col">

        {/* Title */}
        <h2 className="text-xl font-bold text-red-900 mb-6">
          Menu
        </h2>

        {/* Menu Items */}
        <div className="flex flex-col gap-2 text-sm flex-1">

          <button
            onClick={() => setView("mydonations")}
            className={`${menuItem} ${
              activeView === "mydonations" && activeItem
            }`}
          >
            <MdFavorite className="text-lg" />
            My Donations
          </button>

          <button
            onClick={() => setView("mycampaigns")}
            className={`${menuItem} ${
              activeView === "mycampaigns" && activeItem
            }`}
          >
            <MdCampaign className="text-lg" />
            My Campaigns
          </button>

          <button
            onClick={() => {
              setFormMode("add");
              setEditCampaign(null);
              setView("campaignform");
            }}
            className={`${menuItem} ${
              activeView === "campaignform" && activeItem
            }`}
          >
            <MdAssignment className="text-lg" />
            Campaign Form
          </button>

          <button
            onClick={() => setView("donationreceipts")}
            className={`${menuItem} ${
              activeView === "donationreceipts" && activeItem
            }`}
          >
            <FaReceipt className="text-lg" />
            Donation Receipts
          </button>

          <button
            onClick={() => setView("profile")}
            className={`${menuItem} ${
              activeView === "profile" && activeItem
            }`}
          >
            <MdPerson className="text-lg" />
            Profile
          </button>

          <hr className="my-4 border-gray-200" />

          <button
            onClick={onSignout}
            className={`${menuItem} text-red-700 hover:bg-red-50`}
          >
            <MdLogout className="text-lg" />
            Sign Out
          </button>

        </div>

      </aside>

      {/* Signout Loading Modal */}
      {signoutLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <div className="bg-white rounded-xl shadow-lg px-8 py-6 flex flex-col items-center gap-4">

            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-900"></div>

            <p className="text-gray-700 font-medium">
              Signing you out...
            </p>

          </div>

        </div>
      )}
    </>
  );
};

export default Menu;