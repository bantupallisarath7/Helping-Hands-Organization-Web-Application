import { useSelector } from "react-redux";
import Logo from "../../assets/HHO-logo.png";
import ProfileInfo from "../Cards/ProfileInfo";
import { MdMenu } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminNavbar = ({
  setAdminView,
  toggleSidebar,
  refreshProfile,
  setRefreshProfile,
}) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [userData, setUserData] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        `https://api-hho.onrender.com/auth/get/${currentUser.userId}`,
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }

      setUserData(res.data.user);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(errorMsg);
    } finally {
      setRefreshProfile(false);
    }
  };

  useEffect(() => {
    if (currentUser?.userId) {
      getUserInfo();
    }
  }, [refreshProfile, currentUser]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 md:px-6 py-3 flex justify-between items-center">

      {/* Left Section */}
      <div className="flex items-center space-x-3">

        {/* Sidebar Toggle (same as user navbar) */}
        <button
          title="Admin menu"
          onClick={toggleSidebar}
          className="text-2xl text-gray-700 hover:text-red-900"
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
      <div className="hidden lg:flex items-center">
        <div
          onClick={() => setAdminView("admin-profile")}
          className="cursor-pointer"
        >
          {userData && <ProfileInfo userInfo={userData} />}
        </div>
      </div>

      {/* Mobile + Tablet Profile */}
      <div
        ref={menuRef}
        className="lg:hidden cursor-pointer relative"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        {userData && <ProfileInfo userInfo={userData} />}

        {mobileMenu && (
          <div className="absolute top-16 right-4 w-48 bg-white shadow-lg rounded-xl flex flex-col py-2">

            <button
              onClick={() => {
                setAdminView("admin-home");
                setMobileMenu(false);
              }}
              className="px-4 py-2 text-left hover:bg-gray-100"
            >
              Dashboard
            </button>

            <button
              onClick={() => {
                setAdminView("admin-profile");
                setMobileMenu(false);
              }}
              className="px-4 py-2 text-left hover:bg-gray-100"
            >
              Profile
            </button>

          </div>
        )}
      </div>

    </nav>
  );
};

export default AdminNavbar;