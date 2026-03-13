import { useSelector } from "react-redux";
import Logo from "../../assets/HHO-logo.png";
import ProfileInfo from "../Cards/ProfileInfo";
import { MdMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminNavbar = ({ setAdminView, toggleSidebar, refreshProfile, setRefreshProfile }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [userData, setUserData] = useState(null);
  const getUserInfo = async () => {
    try {
      const res = await axios.get(`https://api-hho.onrender.com/auth/get/${currentUser.userId}`, {
        withCredentials: true
      });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
      setUserData(res.data.user);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setRefreshProfile(false)
    }

  };

  useEffect(() => {
    getUserInfo();
  }, [refreshProfile]);
return (
  <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex justify-between items-center">

    {/* Left section */}
    <div className="flex items-center gap-3">

      <button
        onClick={toggleSidebar}
        title="Admin menu"
        className="text-2xl text-gray-700 hover:text-red-900 transition"
      >
        <MdMenu />
      </button>

      <img
        src={Logo}
        alt="HHO Logo"
        className="w-10 h-10 object-contain"
      />

      {/* Desktop Title */}
      <h1
        onClick={() => setAdminView("admin-home")}
        className="hidden md:block text-xl font-bold text-red-900 cursor-pointer"
      >
        Helping Hands Organization
      </h1>

      {/* Mobile Title */}
      <h1
        onClick={() => setAdminView("admin-home")}
        className="md:hidden text-lg font-bold text-red-900 cursor-pointer"
      >
        HHO
      </h1>

    </div>

    {/* Right section */}
    <div
      onClick={() => setAdminView("admin-profile")}
      className="flex items-center cursor-pointer"
    >
      {userData && <ProfileInfo userInfo={userData} />}
    </div>

  </nav>
);
};

export default AdminNavbar;