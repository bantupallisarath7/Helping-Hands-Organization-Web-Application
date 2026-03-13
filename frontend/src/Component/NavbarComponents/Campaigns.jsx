import axios from "axios";
import { useEffect, useState } from "react";
import LiveCampaignCard from "../Cards/LiveCampaignCard"
import { toast } from "react-toastify";

const Campaigns = ({ setView, setFormMode, setEditReceipt }) => {
  const [approvedCampaign, setApprovedCampaign] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApprovedCampaigns = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/campaign/approved/all", {
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
  <div className="flex-1 overflow-y-auto bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Heading */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          Live Campaigns
        </h2>

        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Support students by contributing to ongoing campaigns.
        </p>
      </div>

      {/* Content Wrapper (prevents jump) */}
      <div className="min-h-[60vh] flex flex-col">

        {loading ? (

          <div className="flex flex-1 flex-col items-center justify-center">

            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-900"></div>

            <p className="text-gray-500 mt-4 text-sm">
              Loading campaigns...
            </p>

          </div>

        ) : approvedCampaign.length === 0 ? (

          /* Empty State */
          <div className="flex flex-1 flex-col items-center justify-center text-center">

            <div className="text-6xl mb-4">📢</div>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
              No active campaigns yet
            </h3>

            <p className="text-gray-500 max-w-md text-sm sm:text-base">
              Campaigns will appear here once they are approved. Please check back later.
            </p>

            <button
              onClick={() => {
                setLoading(true);
                getApprovedCampaigns();
              }}
              className="mt-6 px-6 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-800 transition shadow-sm font-medium"
            >
              Refresh Campaigns
            </button>

          </div>

        ) : (

          /* Campaign Grid */
          <div
            className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-2
            xl:grid-cols-3
            items-start
          "
          >

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

        )}

      </div>

    </div>

  </div>
);
};

export default Campaigns;