import { useState, useRef, useEffect } from "react";
import Logo from "../../assets/HHO-logo.png";
import { MdMenu, MdClose } from "react-icons/md";

const PublicNavbar = ({ setView, activeView }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg px-4  md:px-6 py-3 flex justify-between items-center">
      
      {/* Logo + Title */}
      <div className="flex items-center space-x-3">
        <img src={Logo} alt="HHO Logo" className="w-10 h-10 object-contain" />

        {/* Tablet + Desktop Title */}
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
          className={`font-semibold ${
            activeView === "home" ? "text-red-900" : "hover:text-red-900"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => setView("campaigns")}
          className={`font-semibold ${
            activeView === "campaigns"
              ? "text-red-900"
              : "hover:text-red-900"
          }`}
        >
          Campaigns
        </button>

        <button
          onClick={() => setView("events")}
          className={`font-semibold ${
            activeView === "events" ? "text-red-900" : "hover:text-red-900"
          }`}
        >
          Events
        </button>

        <button
          onClick={() => setView("gallery")}
          className={`font-semibold ${
            activeView === "gallery" ? "text-red-900" : "hover:text-red-900"
          }`}
        >
          Gallery
        </button>

        <button
          onClick={() => setView("about")}
          className={`font-semibold ${
            activeView === "about" ? "text-red-900" : "hover:text-red-900"
          }`}
        >
          About
        </button>

        <button
          onClick={() => setView("signin")}
          className="bg-red-900 text-white px-4 py-1.5 rounded hover:bg-red-700 font-semibold"
        >
          Sign in
        </button>
      </div>

      {/* Mobile + Tablet Menu Button */}
      <button
        onClick={() => setMobileMenu(!mobileMenu)}
        className="lg:hidden p-2 text-red-900 hover:bg-red-50 rounded-lg transition"
        aria-label="Menu"
      >
        {mobileMenu ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Mobile + Tablet Dropdown */}
      {mobileMenu && (
        <div
          ref={menuRef}
          className="absolute top-16 right-4 w-48 bg-white shadow-lg rounded-xl flex flex-col py-2 lg:hidden"
        >
          <button
            onClick={() => {
              setView("home");
              setMobileMenu(false);
            }}
            className="px-4 py-2 text-left hover:bg-gray-100"
          >
            Home
          </button>

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
              setView("events");
              setMobileMenu(false);
            }}
            className="px-4 py-2 text-left hover:bg-gray-100"
          >
            Events
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
              setView("about");
              setMobileMenu(false);
            }}
            className="px-4 py-2 text-left hover:bg-gray-100"
          >
            About
          </button>

          <button
            onClick={() => {
              setView("signin");
              setMobileMenu(false);
            }}
            className="mx-3 mt-2 bg-red-900 text-white py-2 rounded hover:bg-red-700"
          >
            Sign in
          </button>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;