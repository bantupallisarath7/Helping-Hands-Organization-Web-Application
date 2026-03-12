import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingHome from "./Component/LandingPage/LandingHome";
import Campaigns from "./Component/NavbarComponents/Campaigns";
import About from "./Component/LandingPage/About";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import PublicNavbar from "./Component/LandingPage/PublicNavbar"
import Dashboard from "./Component/Dashboard";
import AdminDashboard from "./Component/Admin/AdminDashboard"
import { signOutSuccess } from "../redux/user/userSlice";
import Events from "./Component/LandingPage/Events";
import Gallery from "./Component/NavbarComponents/Gallery";
import Loader from "./Pages/Loader";



const App = () => {
  const [view, setView] = useState("home");
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoggedIn = !!currentUser;
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) {
        dispatch(signOutSuccess());
        setView("signin");
      }
    }
  }, []);


  const renderView = () => {
    switch (view) {
      case "home":
        return <LandingHome setView={setView} />;
      case "campaigns":
        return <Campaigns />;
      case "events":
        return <Events />
      case "gallery":
        return <Gallery />
      case "about":
        return <About />;
      case "signin":
        return <Signin setView={setView} onLogin={() => {
          setView("dashboard")
        }} />;
      case "signup":
        return <Signup setView={setView} />;
      default:
        return <LandingHome setView={setView} />;
    }
  };
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="flex flex-col min-h-screen">
          {isLoggedIn ? (
            currentUser.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Dashboard />
            )
          ) : (
            <>
              <PublicNavbar setView={setView} activeView={view} />
              <main className="pt-20 px-6">{renderView()}</main>
            </>
          )}
          <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />
        </div>
      )}
    </>
  );
};

export default App;