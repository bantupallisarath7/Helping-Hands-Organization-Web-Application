import { useEffect, useState } from "react";
import Campaigns from "../../NavbarComponents/Campaigns";
import axios from "axios";
import CampaignCard from "../../Cards/CampaignCard";
import { toast } from "react-toastify";

const ManageCampaigns = ({ setAdminView, setFormMode, setEditCampaign }) => {
  const [allCampaigns, setAllCampaigns] = useState({
    allCampaigns: [],
    pendingCampaigns: [],
    approvedCampaigns: [],
    rejectedCampaigns: [],
    fundedCampaigns: [],
  });
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchAllCampaigns = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/admin/campaign/all", { withCredentials: true });
      if (res.data.status === false) {
        toast.error(res.data.message)
      }
      setAllCampaigns({
        ...allCampaigns,
        allCampaigns: [...res.data.campaigns],
        pendingCampaigns: [...res.data.pendingCampaigns],
        approvedCampaigns: [...res.data.approvedCampaigns],
        rejectedCampaigns: [...res.data.rejectedCampaigns],
        fundedCampaigns: [...res.data.fundedCampaigns]
      })
      // toast.success(res.data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchAllCampaigns()
  }, [])

  const getCampaigns = () => {
    switch (status) {
      case "pending":
        return allCampaigns.pendingCampaigns;
      case "approved":
        return allCampaigns.approvedCampaigns;
      case "rejected":
        return allCampaigns.rejectedCampaigns;
      case "funded":
        return allCampaigns.fundedCampaigns;
      case "all":
        return allCampaigns.allCampaigns;
      default:
        return allCampaigns.allCampaigns;
    }
  };


return (
  <div className="flex flex-col mt-6">

    {/* Heading */}
    <div className="max-w-7xl mx-auto w-full px-4 mb-6">
      <h2 className="text-lg sm:text-xl font-bold text-red-900 text-center md:text-left">
        Manage Campaigns
      </h2>

      <p className="text-gray-500 text-sm sm:text-base mt-1 text-center md:text-left">
        Review, approve, or reject campaigns and keep track of their funding status.
      </p>
    </div>


    {/* Filter Buttons */}
    <div className="max-w-7xl mx-auto w-full px-4 mb-4">
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">

        <button
          onClick={() => setStatus("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
          ${status === "all"
              ? "bg-blue-200 text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-blue-200 hover:text-gray-900"
            }`}
        >
          All
        </button>

        <button
          onClick={() => setStatus("pending")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
          ${status === "pending"
              ? "bg-yellow-200 text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-yellow-200 hover:text-gray-900"
            }`}
        >
          Pending
        </button>

        <button
          onClick={() => setStatus("approved")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
          ${status === "approved"
              ? "bg-green-200 text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-green-200 hover:text-gray-900"
            }`}
        >
          Approved
        </button>

        <button
          onClick={() => setStatus("rejected")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
          ${status === "rejected"
              ? "bg-red-200 text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-red-200 hover:text-gray-900"
            }`}
        >
          Rejected
        </button>

        <button
          onClick={() => setStatus("funded")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
          ${status === "funded"
              ? "bg-green-200 text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-green-200 hover:text-gray-900"
            }`}
        >
          Funded
        </button>

      </div>
    </div>


    {/* Campaign Section */}
    <div className="flex-1 px-4 pb-8">

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-700"></div>
        </div>
      ) : getCampaigns().length === 0 ? (

        <div className="flex flex-col items-center justify-center py-20 text-center">

          <div className="text-6xl mb-4">📢</div>

          <h3 className="text-xl sm:text-2xl font-semibold text-red-900 mb-2">
            No {status} campaigns found
          </h3>

          <p className="text-gray-500 text-sm max-w-md">
            Users haven't created any{" "}
            {status === "all" ? "campaigns" : status + " campaigns"} yet.
            Try refreshing or check back later.
          </p>

          <button
            onClick={() => {
              setLoading(true);
              fetchAllCampaigns();
            }}
            className="mt-6 px-5 py-2 bg-red-900 text-white rounded-md hover:bg-red-700 transition"
          >
            Refresh Campaigns
          </button>

        </div>

      ) : (

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">

          {getCampaigns().map((campaign) => (
            <CampaignCard
              key={campaign._id}
              campaign={campaign}
              setDashboardView={setAdminView}
              setFormMode={setFormMode}
              setEditCampaign={setEditCampaign}
              refreshCampaigns={fetchAllCampaigns}
            />
          ))}

        </div>

      )}

    </div>

  </div>
);
}
export default ManageCampaigns;
