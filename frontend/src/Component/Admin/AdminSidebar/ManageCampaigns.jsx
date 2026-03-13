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
    <div className="relative w-full max-w-md sm:max-w-2xl md:max-w-4xl mx-auto px-4 mb-6">
      <h2 className="text-lg sm:text-xl font-bold text-red-900 text-center md:text-left">
        Manage Campaigns
      </h2>
      <p className="text-gray-500 text-sm sm:text-base mt-1 text-center md:text-left">
        Review, approve, or reject campaigns and keep track of their funding status.
      </p>
    </div>

    {/* Filter Buttons */}
    <div className="relative w-full max-w-md sm:max-w-2xl md:max-w-4xl mx-auto px-4 mb-4">
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
        {/* buttons here */}
      </div>
    </div>

    {/* Campaign Section */}
    <div className="relative w-full max-w-md sm:max-w-2xl md:max-w-4xl mx-auto px-4 pb-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-200 border-t-red-700"></div>
        </div>
      ) : getCampaigns().length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          {/* empty state */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
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
