import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import Home from "./NavbarComponents/Home";
import Menu from "./Menu";
import Campaigns from "./NavbarComponents/Campaigns";
import Gallery from "./NavbarComponents/Gallery";
import MyDonations from "./UserSidebar/MyDonation";
import MyCampaign from "./UserSidebar/MyCampaign";
import SavedCampaigns from "./UserSidebar/SavedCampaigns";
import CampaignForm from "./UserSidebar/CampaignForm";
import Profile from "./UserSidebar/Profile";
import DonationReceipts from "./UserSidebar/DonationReceipts";
import DonationFormModal from "./Cards/DonationFormModal";
import { useSelector } from "react-redux";
import Events from "./LandingPage/Events";

const Dashboard = () => {
  const [view, setView] = useState("home");
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formMode, setFormMode] = useState("add"); // or "edit"
  const [editCampaign, setEditCampaign] = useState(null);
  const [editReceipt, setEditReceipt] = useState(null);
  const [refreshProfile, setRefreshProfile] = useState(false);

  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const renderView = () => {
    switch (view) {
      case "home":
        return <Home setView={setView} />;
      case "campaigns":
        return (
          <Campaigns
            setView={setView}
            setFormMode={setFormMode}
            setEditReceipt={setEditReceipt}
          />
        );
      case "gallery":
        return <Gallery isAdmin={false} />;
      case "events":
        return <Events />;
      case "mydonations":
        return <MyDonations />;
      case "mycampaigns":
        return (
          <MyCampaign
            setView={setView}
            setFormMode={setFormMode}
            setEditCampaign={setEditCampaign}
          />
        );
      case "savedcampaigns":
        return (
          <SavedCampaigns
            setView={setView}
            setFormMode={setFormMode}
            setEditReceipt={setEditReceipt}
          />
        );
      case "campaignform":
        return (
          <CampaignForm
            type={formMode}
            campaign={editCampaign}
            setView={setView}
          />
        );
      case "donationform":
        return (
          <DonationFormModal
            type={formMode}
            receipt={editReceipt}
            setView={setView}
          />
        );
      case "donationreceipts":
        return (
          <DonationReceipts
            setView={setView}
            setFormMode={setFormMode}
            setEditReceipt={setEditReceipt}
          />
        );
      case "profile":
        return (
          <Profile
            userId={currentUser.userId}
            role={currentUser.role}
            setRefreshProfile={setRefreshProfile}
          />
        );
      default:
        return <Home setView={setView} />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <Navbar
        setView={setView}
        toggleSidebar={toggleSidebar}
        refreshProfile={refreshProfile}
        setRefreshProfile={setRefreshProfile}
        activeView={view}
      />

      {/* Main Layout */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar + Overlay */}
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <div
              ref={sidebarRef}
              className="fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white shadow-lg z-40 transition-transform duration-300"
            >
              <Menu
                setView={setView}
                activeView={view}
                setFormMode={setFormMode}
                setEditCampaign={setEditCampaign}
              />
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 transition-all duration-300">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;