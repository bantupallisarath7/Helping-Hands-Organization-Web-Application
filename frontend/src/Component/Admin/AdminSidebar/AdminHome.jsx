import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminHome = ({ setAdminView }) => {
  const [collectedAmount, setCollectedAmount] = useState(0);
  const [countPendingCampaigns, setCountPendingCampaigns] = useState(0);
  const [countApprovedCampaigns, setCountApprovedCampaigns] = useState(0);
  const [pendingReceipts, setPendingReceipts] = useState(0);
  const [loading, setLoading] = useState(true);
  const stats = {
    lastApproved: "₹5,000 for 'Medical Aid for Rani'"
  };

  const fetchCollectedAmount = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/receipt/all/collectedamount", { withCredentials: true });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      setCollectedAmount(res.data.amount)
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/admin/campaign/all", { withCredentials: true });
      if (res.data.status === false) {
        toast.error(res.data.message)
      }
      setCountPendingCampaigns(res.data.pendingCampaigns.length)
      setCountApprovedCampaigns(res.data.approvedCampaigns.length)
      // toast.success(res.data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  const fetchPendingReceipts = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/admin/receipt/all", { withCredentials: true });
      if (res.data.status === false) {
        toast.error(res.data.message)
      }
      setPendingReceipts(res.data.pendingReceipts.length)
      // toast.success(res.data.message)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }






  useEffect(() => {
    fetchCollectedAmount();
    fetchCampaigns();
    fetchPendingReceipts();
  }, [])


return (
  <div className="flex-1 overflow-y-auto bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Welcome Section */}
      <section className="text-center">

        <h1 className="text-2xl sm:text-3xl font-bold text-red-900">
          Welcome Admin
        </h1>

        <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
          Here's an overview of platform activity and pending actions.
        </p>

      </section>


      {/* Quick Stats */}
      <section
        className="
        grid gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
      "
      >

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">

          <p className="text-sm font-medium text-gray-500">
            Total Donations
          </p>

          <p className="text-3xl font-bold text-red-900 mt-2">
            ₹{collectedAmount}
          </p>

        </div>


        <div
          onClick={() => setAdminView("applications")}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center"
        >

          <p className="text-sm font-medium text-gray-500">
            New Campaigns
          </p>

          <p className="text-3xl font-bold text-red-900 mt-2">
            {countPendingCampaigns}
          </p>

        </div>


        <div
          onClick={() => setAdminView("manage-campaigns")}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center"
        >

          <p className="text-sm font-medium text-gray-500">
            Live Campaigns
          </p>

          <p className="text-3xl font-bold text-red-900 mt-2">
            {countApprovedCampaigns}
          </p>

        </div>


        <div
          onClick={() => setAdminView("admin-donation-receipts")}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center"
        >

          <p className="text-sm font-medium text-gray-500">
            Pending Receipts
          </p>

          <p className="text-3xl font-bold text-red-900 mt-2">
            {pendingReceipts}
          </p>

        </div>

      </section>


      {/* Admin Actions */}
      <section className="flex flex-col sm:flex-row gap-4 justify-center">

        <button
          onClick={() => setAdminView("manage-campaigns")}
          className="w-full sm:w-auto bg-red-900 text-white px-6 py-2.5 rounded-lg hover:bg-red-800 transition shadow-sm font-medium"
        >
          Review Campaigns
        </button>

        <button
          onClick={() => setAdminView("applications")}
          className="w-full sm:w-auto bg-red-900 text-white px-6 py-2.5 rounded-lg hover:bg-red-800 transition shadow-sm font-medium"
        >
          Approve Applications
        </button>

        <button
          onClick={() => setAdminView("admin-donation-receipts")}
          className="w-full sm:w-auto bg-red-900 text-white px-6 py-2.5 rounded-lg hover:bg-red-800 transition shadow-sm font-medium"
        >
          Verify Donations
        </button>

      </section>


      {/* Recent Activity */}
      <section className="space-y-4">

        <h2 className="text-lg sm:text-xl font-bold text-red-900">
          Recent Admin Activity
        </h2>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">

          <p className="text-gray-700 text-sm sm:text-base">

            <span className="font-semibold text-red-900">
              Last Approved:
            </span>{" "}
            {stats.lastApproved}

          </p>

        </div>

      </section>

    </div>

  </div>
);
};

export default AdminHome;