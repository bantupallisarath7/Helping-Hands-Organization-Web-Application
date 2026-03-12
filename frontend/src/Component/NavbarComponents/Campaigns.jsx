import axios from "axios";
import { useEffect, useState } from "react";
import LiveCampaignCard from "../Cards/LiveCampaignCard"
import { toast } from "react-toastify";

const Campaigns = ({ setView, setFormMode, setEditReceipt }) => {
  const [approvedCampaign, setApprovedCampaign] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApprovedCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:8815/campaign/approved/all", {
        withCredentials: true,
      });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
      setApprovedCampaign(res.data.approvedCampaigns);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApprovedCampaigns();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-6 w-full">
        <h2 className="text-lg sm:text-xl font-bold text-red-900 text-center md:text-left">
          Live Campaigns
        </h2>
        <p className="text-gray-500 text-sm sm:text-base text-center md:text-left mt-1">
          Support students by contributing to ongoing campaigns.
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-700"></div>
        </div>
      ) : approvedCampaign.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-16 py-16">
          <div className="text-6xl mb-4">📢</div>

          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
            No active campaigns yet
          </h3>

          <p className="text-sm sm:text-base text-gray-500 max-w-md">
            Campaigns will appear here once they are approved. Please check back
            later.
          </p>

          <button
            onClick={() => {
              setLoading(true);
              getApprovedCampaigns();
            }}
            className="mt-6 px-5 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-sm"
          >
            Refresh Campaigns
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 justify-center
          grid-cols-1
          sm:grid-cols-1
          md:grid-cols-2
          lg:grid-cols-2
          xl:grid-cols-3">

            {approvedCampaign.map((campaign) => (
              <div key={campaign._id} className="flex justify-center">
                <LiveCampaignCard
                  campaign={campaign}
                  isAdmin={false}
                  onEdit={() => alert("Edit clicked")}
                  onDelete={() => alert("Delete clicked")}
                  onBookmark={() => alert("Bookmark")}
                  onAddAmount={() => alert("Add amount")}
                  setView={setView}
                  setFormMode={setFormMode}
                  setEditReceipt={setEditReceipt}
                />
              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;