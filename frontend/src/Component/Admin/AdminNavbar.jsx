import { useSelector } from "react-redux";
import Logo from "../../assets/HHO-logo.png";
import ProfileInfo from "../Cards/ProfileInfo";
import { MdMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 md:px-6 py-3 flex justify-between items-center">

    {/* Left Section */}
    <div className="flex items-center space-x-3">

      {/* Sidebar button */}
      <button
        title="Admin menu"
        onClick={toggleSidebar}
        className="text-2xl text-gray-700 hover:text-red-900 transition-colors"
      >
        <MdMenu />
      </button>

      {/* Logo */}
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

    {/* Desktop Profile */}
    <div className="hidden md:flex items-center text-gray-700 font-medium">

      <div
        onClick={() => setAdminView("admin-profile")}
        className="cursor-pointer"
      >
        {userData && <ProfileInfo userInfo={userData} />}
      </div>

    </div>

  </nav>
);
};

export default AdminNavbar;