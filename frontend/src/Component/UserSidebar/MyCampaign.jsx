import { useEffect } from "react";
import CampaignCard from "../Cards/CampaignCard";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const MyCampaign = ({ setView, setFormMode, setEditCampaign }) => {
  const [myCampaign, setMyCampaign] = useState({
    allCampaigns: [],
    pendingCampaigns: [],
    approvedCampaigns: [],
    rejectedCampaigns: [],
    fundedCampaigns: [],
  });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/campaign/all", { withCredentials: true })
      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
      setMyCampaign({
        ...myCampaign,
        allCampaigns: [...res.data.campaigns],
        pendingCampaigns: [...res.data.pendingCampaigns],
        approvedCampaigns: [...res.data.approvedCampaigns],
        rejectedCampaigns: [...res.data.rejectedCampaigns],
        fundedCampaigns: [...res.data.fundedCampaigns]
      })
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchCampaigns();
  }, [])

  const getCampaigns = () => {
    switch (status) {
      case "pending":
        return myCampaign.pendingCampaigns;
      case "approved":
        return myCampaign.approvedCampaigns;
      case "rejected":
        return myCampaign.rejectedCampaigns;
      case "funded":
        return myCampaign.fundedCampaigns;
      case "all":
        return myCampaign.allCampaigns;
      default:
        return myCampaign.allCampaigns;
    }
  };

return (
  <div className="flex-1 overflow-y-auto bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Header */}
      <section className="text-center sm:text-left">

        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          My Campaigns
        </h2>

        <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-2xl">
          Manage your campaigns by status. Track pending approvals, funded
          projects, and more.
        </p>

      </section>


      {/* Status Filters */}
      <section>

        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">

          <button
            onClick={() => setStatus("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${
              status === "all"
                ? "bg-red-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setStatus("pending")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${
              status === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Pending
          </button>

          <button
            onClick={() => setStatus("approved")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${
              status === "approved"
                ? "bg-green-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setStatus("rejected")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${
              status === "rejected"
                ? "bg-red-500 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Rejected
          </button>

          <button
            onClick={() => setStatus("funded")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${
              status === "funded"
                ? "bg-green-700 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Funded
          </button>

        </div>

      </section>


      {/* Campaign Content */}
      <section className="min-h-[60vh]">

        {loading ? (

          <div className="flex items-center justify-center h-60">

            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-900"></div>

          </div>

        ) : getCampaigns().length === 0 ? (

          <div className="flex flex-col items-center justify-center py-20 text-center">

            <div className="text-6xl mb-4">📢</div>

            <h3 className="text-xl sm:text-2xl font-semibold text-red-900 mb-2">
              No {status} campaigns found
            </h3>

            <p className="text-gray-500 text-sm max-w-md">
              You haven't created any{" "}
              {status === "all" ? "campaigns" : status + " campaigns"} yet.
            </p>

            <button
              onClick={() => {
                setLoading(true);
                fetchCampaigns();
              }}
              className="mt-6 px-6 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-800 transition shadow-sm font-medium"
            >
              Refresh Campaigns
            </button>

          </div>

        ) : (

          <div
            className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          "
          >

            {getCampaigns().map((campaign) => (
              <CampaignCard
                key={campaign._id}
                campaign={campaign}
                isAdmin={false}
                setDashboardView={setView}
                setFormMode={setFormMode}
                setEditCampaign={setEditCampaign}
                refreshCampaigns={fetchCampaigns}
              />
            ))}

          </div>

        )}

      </section>

    </div>

  </div>
);
};

export default MyCampaign;