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
  <div className="flex-1 overflow-y-auto bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Header */}
      <section className="text-center sm:text-left">

        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          Manage Campaigns
        </h2>

        <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-2xl">
          Review, approve, or reject campaigns and keep track of their funding status.
        </p>

      </section>


      {/* Status Filters */}
      <section>

        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">

          <button
            onClick={() => setStatus("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${status === "all"
                ? "bg-red-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
          >
            All
          </button>

          <button
            onClick={() => setStatus("pending")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${status === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
          >
            Pending
          </button>

          <button
            onClick={() => setStatus("approved")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${status === "approved"
                ? "bg-green-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
          >
            Approved
          </button>

          <button
            onClick={() => setStatus("rejected")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${status === "rejected"
                ? "bg-red-500 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
          >
            Rejected
          </button>

          <button
            onClick={() => setStatus("funded")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${status === "funded"
                ? "bg-green-700 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
          >
            Funded
          </button>

        </div>

      </section>


      {/* Campaign Section */}
      <section className="min-h-[60vh]">

        {loading ? (

          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">

            {/* Spinner */}
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-900"></div>

            {/* Loading text */}
            <p className="text-gray-500 text-sm sm:text-base font-medium">
              Loading campaigns...
            </p>

          </div>

        ) : getCampaigns().length === 0 ? (

          <div className="flex flex-col items-center justify-center py-20 text-center">

            <div className="text-6xl mb-4">📢</div>

            <h3 className="text-xl sm:text-2xl font-semibold text-red-900 mb-2">
              No {status} campaigns found
            </h3>

            <p className="text-gray-500 text-sm max-w-md">
              No {status === "all" ? "campaigns" : status + " campaigns"} available right now.
            </p>

            <button
              onClick={() => {
                setLoading(true);
                fetchAllCampaigns();
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
                setDashboardView={setAdminView}
                setFormMode={setFormMode}
                setEditCampaign={setEditCampaign}
                refreshCampaigns={fetchAllCampaigns}
              />
            ))}

          </div>

        )}

      </section>

    </div>

  </div>
);
}
export default ManageCampaigns;
