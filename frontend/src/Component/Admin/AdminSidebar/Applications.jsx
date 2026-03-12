import axios from "axios";
import CampaignCard from "../../Cards/CampaignCard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Applications = ({ setAdminView, setFormMode, setEditCampaign }) => {
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPendingCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:8815/admin/campaign/all", { withCredentials: true });
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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-6">

      {/* Header */}
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-lg sm:text-xl font-bold text-red-900 text-center sm:text-left">
          Pending Campaign Applications
        </h2>

        <p className="text-gray-500 text-sm sm:text-base text-center sm:text-left mt-1 max-w-2xl">
          Review and approve campaign applications submitted by users.
        </p>
      </div>

      {/* Campaign Section */}
      <div className="max-w-7xl mx-auto w-full flex-1 py-4">

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-200 border-t-red-700"></div>
          </div>

        ) : pendingCampaigns.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="text-6xl mb-4">📄</div>

            <h3 className="text-xl sm:text-2xl font-semibold text-red-900 mb-2">
              No pending campaigns found
            </h3>

            <p className="text-sm sm:text-base text-gray-500 max-w-md">
              All caught up! There are currently no campaigns awaiting review.
              Check back later for new submissions.
            </p>

            <button
              onClick={() => {
                setLoading(true);
                fetchPendingCampaigns();
              }}
              className="mt-6 px-5 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-700 transition shadow"
            >
              Refresh
            </button>
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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

      </div>
    </div>
  );
};

export default Applications;