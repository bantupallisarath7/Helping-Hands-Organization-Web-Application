import axios from "axios";
import CampaignCard from "../../Cards/CampaignCard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Applications = ({ setAdminView, setFormMode, setEditCampaign }) => {
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPendingCampaigns = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/admin/campaign/all", { withCredentials: true });
      if (res.data.status === false) {
        toast.error(res.data.message)
      }
      setPendingCampaigns(res.data.pendingCampaigns)
      // toast.success(res.data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPendingCampaigns()
  }, [])

return (
  <div className="flex-1 overflow-y-auto bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Header */}
      <section className="text-center sm:text-left">

        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          Pending Campaign Applications
        </h2>

        <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-2xl">
          Review and approve campaign applications submitted by users.
        </p>

      </section>


      {/* Campaign Section */}
      <section className="min-h-[60vh]">

        {loading ? (

          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">

            {/* Spinner */}
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-900"></div>

            <p className="text-gray-500 text-sm sm:text-base font-medium">
              Loading pending campaigns...
            </p>

          </div>

        ) : pendingCampaigns.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-20 text-center">

            <div className="text-6xl mb-4">📄</div>

            <h3 className="text-xl sm:text-2xl font-semibold text-red-900 mb-2">
              No pending campaigns found
            </h3>

            <p className="text-gray-500 text-sm max-w-md">
              All caught up! There are currently no campaigns awaiting review.
            </p>

            <button
              onClick={() => {
                setLoading(true);
                fetchPendingCampaigns();
              }}
              className="mt-6 px-6 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-800 transition shadow-sm font-medium"
            >
              Refresh Campaigns
            </button>

          </div>

        ) : (

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

            {pendingCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign._id}
                campaign={campaign}
                setDashboardView={setAdminView}
                setFormMode={setFormMode}
                setEditCampaign={setEditCampaign}
                refreshCampaigns={fetchPendingCampaigns}
              />
            ))}

          </div>

        )}

      </section>

    </div>
  </div>
);
};

export default Applications;