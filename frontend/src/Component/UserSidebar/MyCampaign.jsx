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
      const res = await axios.get("http://localhost:8815/campaign/all", { withCredentials: true })
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
  <div className="flex flex-col mt-6 px-4 sm:px-6 lg:px-8">

    {/* Header */}
    <div className="max-w-7xl mx-auto w-full mb-6">
      <h2 className="text-lg sm:text-xl font-bold text-red-900 text-center sm:text-left">
        My Campaigns
      </h2>

      <p className="text-gray-500 text-sm sm:text-base text-center sm:text-left mt-1">
        Manage your campaigns by status. Track pending approvals, funded projects, and more.
      </p>
    </div>


    {/* Status Filters */}
    <div className="max-w-7xl mx-auto w-full mb-4">
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">

        <button
          onClick={() => setStatus("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
          ${
            status === "all"
              ? "bg-blue-200 text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-blue-200 hover:text-gray-900"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setStatus("pending")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
          ${
            status === "pending"
              ? "bg-yellow-200 text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-yellow-200 hover:text-gray-900"
          }`}
        >
          Pending
        </button>

        <button
          onClick={() => setStatus("approved")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
          ${
            status === "approved"
              ? "bg-green-200 text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-green-200 hover:text-gray-900"
          }`}
        >
          Approved
        </button>

        <button
          onClick={() => setStatus("rejected")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
          ${
            status === "rejected"
              ? "bg-red-200 text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-red-200 hover:text-gray-900"
          }`}
        >
          Rejected
        </button>

        <button
          onClick={() => setStatus("funded")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
          ${
            status === "funded"
              ? "bg-green-200 text-gray-900"
              : "bg-gray-100 text-gray-700 hover:bg-green-200 hover:text-gray-900"
          }`}
        >
          Funded
        </button>

      </div>
    </div>


    {/* Campaign List */}
    <div className="flex-1 pb-8">

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
            You haven't created any{" "}
            {status === "all" ? "campaigns" : status + " campaigns"} yet.
          </p>

          <button
            onClick={() => {
              setLoading(true);
              fetchCampaigns();
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
              isAdmin={false}
              setDashboardView={setView}
              setFormMode={setFormMode}
              setEditCampaign={setEditCampaign}
              refreshCampaigns={fetchCampaigns}
            />
          ))}

        </div>

      )}

    </div>

  </div>
);
};

export default MyCampaign;