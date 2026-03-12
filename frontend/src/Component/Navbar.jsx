import axios from "axios";
import Logo from "../assets/HHO-logo.png";
import ProfileInfo from "./Cards/ProfileInfo";
import { MdMenu } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Navbar = ({
  setView,
  toggleSidebar,
  refreshProfile,
  setRefreshProfile,
  activeView,
}) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [userData, setUserData] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const menuRef = useRef(null);

  const getUserInfo = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8815/auth/get/${currentUser.userId}`,
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
    getUserInfo();
  }, [refreshProfile]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 md:px-6 py-3 flex justify-between items-center">

      {/* Left Section */}
      <div className="flex items-center space-x-3">

        {/* Sidebar button only desktop */}
        <button
          title="User menu"
          onClick={toggleSidebar}
          className="text-2xl text-gray-700 hover:text-red-900"
        >
          <MdMenu />
        </button>

        <img src={Logo} alt="HHO Logo" className="w-10 h-10 object-contain" />

        {/* Desktop Title */}
        <h1
          onClick={() => setView("home")}
          className="hidden md:block text-xl font-bold text-red-900 cursor-pointer"
        >
          Helping Hands Organization
        </h1>

        {/* Mobile Title */}
        <h1
          onClick={() => setView("home")}
          className="md:hidden text-lg font-bold text-red-900 cursor-pointer"
        >
          HHO
        </h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex space-x-6 items-center text-gray-700 font-medium">

        <button
          onClick={() => setView("home")}
          className={`font-semibold ${activeView === "home"
              ? "text-red-900"
              : "hover:text-red-900"
            }`}
        >
          Home
        </button>

        <button
          onClick={() => setView("campaigns")}
          className={`font-semibold ${activeView === "campaigns"
              ? "text-red-900"
              : "hover:text-red-900"
            }`}
        >
          Campaigns
        </button>

        <button
          onClick={() => setView("gallery")}
          className={`font-semibold ${activeView === "gallery"
              ? "text-red-900"
              : "hover:text-red-900"
            }`}
        >
          Gallery
        </button>

        <button
          onClick={() => setView("events")}
          className={`font-semibold ${activeView === "events"
              ? "text-red-900"
              : "hover:text-red-900"
            }`}
        >
          Events
        </button>

        {/* Desktop Profile */}
        <div onClick={() => setView("profile")} className="cursor-pointer">
          {userData && <ProfileInfo userInfo={userData} />}
        </div>
      </div>

      {/* Mobile + Tablet Profile */}
      <div
        ref={menuRef}
        className="lg:hidden cursor-pointer"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        {userData && <ProfileInfo userInfo={userData} />}

        {mobileMenu && (
          <div className="absolute top-16 right-4 w-48 bg-white shadow-lg rounded-xl flex flex-col py-2 lg:hidden">

            <button
              onClick={() => {
                setView("campaigns");
                setMobileMenu(false);
              }}
              className="px-4 py-2 text-left hover:bg-gray-100"
            >
              Campaigns
            </button>

            <button
              onClick={() => {
                setView("gallery");
                setMobileMenu(false);
              }}
              className="px-4 py-2 text-left hover:bg-gray-100"
            >
              Gallery
            </button>

            <button
              onClick={() => {
                setView("events");
                setMobileMenu(false);
              }}
              className="px-4 py-2 text-left hover:bg-gray-100"
            >
              Events
            </button>

            <button
              onClick={() => {
                setView("profile");
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

export default Navbar;