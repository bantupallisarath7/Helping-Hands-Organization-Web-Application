import {
  MdFavorite,
  MdCampaign,
  MdAssignment,
  MdPerson,
  MdLogout,
} from "react-icons/md";
import { FaReceipt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signOutFailure, signOutStart, signOutSuccess } from "../../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Menu = ({ setView, activeView, setFormMode, setEditCampaign }) => {
  const dispatch = useDispatch();

  const onSignout = async () => {
    try {
      dispatch(signOutStart());
      const res = await axios.get("https://api-hho.onrender.com/auth/signout", {
        withCredentials: true,
      });

      if (res.data.success === false) {
        toast.error(res.data.message);
        dispatch(signOutFailure(res.data.message));
        return;
      }

      dispatch(signOutSuccess());
      toast.success(res.data.message);
      setView("signin");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
      dispatch(signOutFailure(error));
    }
  };

  const menuItem =
    "flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-red-50 hover:text-red-900";

  const activeItem = "bg-red-100 text-red-900 font-semibold";

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md p-6">
      
      <h2 className="text-lg font-bold text-red-900 mb-6">Menu</h2>

      <div className="flex flex-col gap-3 text-gray-700 text-sm">

        <button
          onClick={() => setView("mydonations")}
          className={`${menuItem} ${activeView === "mydonations" && activeItem}`}
        >
          <MdFavorite className="text-xl" />
          My Donations
        </button>

        <button
          onClick={() => setView("mycampaigns")}
          className={`${menuItem} ${activeView === "mycampaigns" && activeItem}`}
        >
          <MdCampaign className="text-xl" />
          My Campaigns
        </button>

        <button
          onClick={() => {
            setFormMode("add");
            setEditCampaign(null);
            setView("campaignform");
          }}
          className={`${menuItem} ${activeView === "campaignform" && activeItem}`}
        >
          <MdAssignment className="text-xl" />
          Campaign Form
        </button>

        <button
          onClick={() => setView("donationreceipts")}
          className={`${menuItem} ${activeView === "donationreceipts" && activeItem}`}
        >
          <FaReceipt className="text-xl" />
          Donation Receipts
        </button>

        <button
          onClick={() => setView("profile")}
          className={`${menuItem} ${activeView === "profile" && activeItem}`}
        >
          <MdPerson className="text-xl" />
          Profile
        </button>

        <hr className="my-3" />

        <button
          onClick={onSignout}
          className={`${menuItem} text-red-800 hover:bg-red-100`}
        >
          <MdLogout className="text-xl" />
          Sign out
        </button>

      </div>
    </aside>
  );
};

export default Menu;