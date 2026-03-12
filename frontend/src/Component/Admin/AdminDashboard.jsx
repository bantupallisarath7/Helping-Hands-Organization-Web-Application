import { useState } from "react";
import AdminMenu from "./AdminSidebar/AdminMenu";
import AdminNavbar from "./AdminNavbar";
import ManageCampaigns from "./AdminSidebar/ManageCampaigns";
import Applications from "./AdminSidebar/Applications";
import Gallery from "../NavbarComponents/Gallery";
import AdminDonationReceipts from "./AdminSidebar/AdminDonationReceipts";
import ManageUsers from "./AdminSidebar/ManageUser";
import AdminHome from "./AdminSidebar/AdminHome";
import CampaignForm from "../UserSidebar/CampaignForm";
import DonationFormModal from "../Cards/DonationFormModal"
import Profile from "../UserSidebar/Profile";
import { useSelector } from "react-redux";
import AdminEventUpdates from "./AdminSidebar/AdminEventUpdates";
import EventForm from "../Cards/EventForm";
import LandingHome from "../LandingPage/LandingHome"

const AdminDashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [adminView, setAdminView] = useState("admin-home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [editCampaign, setEditCampaign] = useState(null);
  const [editReceipt, setEditReceipt] = useState(null)
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editEvent, setEditEvent] = useState(null)
  const [refreshProfile, setRefreshProfile] = useState(false)




  const renderView = () => {
    switch (adminView) {
      case "admin-home":
        return <AdminHome setAdminView={setAdminView} />;
      case "landingpage-home":
        return <LandingHome />
      case "manage-campaigns":
        return <ManageCampaigns setAdminView={setAdminView} setFormMode={setFormMode} setEditCampaign={setEditCampaign} />
      case "campaignform":
        return <CampaignForm type={formMode} campaign={editCampaign} setView={setAdminView} />;
      case "applications":
        return <Applications setAdminView={setAdminView} setFormMode={setFormMode} setEditCampaign={setEditCampaign} />;
      case "manage-gallery":
        return <Gallery isAdmin={true} />;
      case "admin-donation-receipts":
        return <AdminDonationReceipts setAdminView={setAdminView} setFormMode={setFormMode} setEditReceipt={setEditReceipt} />;
      case "donationform":
        return <DonationFormModal type={formMode} receipt={editReceipt} setView={setAdminView} />
      case "manage-users":
        return <ManageUsers setAdminView={setAdminView} setSelectedUserId={setSelectedUserId} />;
      case "admin-profile":
        return <Profile userId={selectedUserId || currentUser.userId} role={currentUser.role} setRefreshProfile={setRefreshProfile} />
      case "manage-events":
        return <AdminEventUpdates setAdminView={setAdminView} setFormMode={setFormMode} setEditEvent={setEditEvent} />
      case "admin-event-form":
        return <EventForm type={formMode} event={editEvent} setAdminView={setAdminView} />
      default:
        return <AdminHome />;
    }
  };
return (
  <div className="flex flex-col h-screen">
    {/* Navbar */}
    <AdminNavbar
      setAdminView={setAdminView}
      toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      refreshProfile={refreshProfile}
      setRefreshProfile={setRefreshProfile}
    />

    {/* Layout */}
    <div className="flex flex-1 pt-16">

      {/* Sidebar + Overlay */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white shadow-lg z-40 transition-transform duration-300">
            <AdminMenu
              setAdminView={setAdminView}
              activeView={adminView}
              setSelectedUserId={setSelectedUserId}
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

export default AdminDashboard;