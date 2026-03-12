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
      const res = await axios.get("http://localhost:8815/receipt/all/collectedamount", { withCredentials: true });
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
      const res = await axios.get("http://localhost:8815/admin/campaign/all", { withCredentials: true });
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
      const res = await axios.get("http://localhost:8815/admin/receipt/all", { withCredentials: true });
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
  <div className="space-y-10 max-w-7xl mx-auto">

    {/* Welcome Section */}
    <section className="text-center py-6 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-red-900">
        Welcome Admin
      </h1>
      <p className="text-gray-600 mt-2 text-sm sm:text-base">
        Here's an overview of platform activity and pending actions.
      </p>
    </section>


    {/* Quick Stats */}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4">

      <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition text-center">
        <h2 className="text-sm sm:text-base font-semibold text-red-900">
          Total Donations
        </h2>
        <p className="text-xl sm:text-2xl font-bold mt-2">
          ₹{collectedAmount}
        </p>
      </div>

      <div
        onClick={() => setAdminView("applications")}
        className="bg-white p-5 rounded-lg shadow hover:shadow-md transition text-center cursor-pointer"
      >
        <h2 className="text-sm sm:text-base font-semibold text-red-900">
          New Campaigns
        </h2>
        <p className="text-xl sm:text-2xl font-bold mt-2">
          {countPendingCampaigns}
        </p>
      </div>

      <div
        onClick={() => setAdminView("manage-campaigns")}
        className="bg-white p-5 rounded-lg shadow hover:shadow-md transition text-center cursor-pointer"
      >
        <h2 className="text-sm sm:text-base font-semibold text-red-900">
          Live Campaigns
        </h2>
        <p className="text-xl sm:text-2xl font-bold mt-2">
          {countApprovedCampaigns}
        </p>
      </div>

      <div
        onClick={() => setAdminView("admin-donation-receipts")}
        className="bg-white p-5 rounded-lg shadow hover:shadow-md transition text-center cursor-pointer"
      >
        <h2 className="text-sm sm:text-base font-semibold text-red-900">
          Pending Receipts
        </h2>
        <p className="text-xl sm:text-2xl font-bold mt-2">
          {pendingReceipts}
        </p>
      </div>

    </section>


    {/* Admin Actions */}
    <section className="px-4">

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

        <button
          onClick={() => setAdminView("manage-campaigns")}
          className="w-full sm:w-auto bg-red-900 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
        >
          Review Campaigns
        </button>

        <button
          onClick={() => setAdminView("applications")}
          className="w-full sm:w-auto bg-red-900 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
        >
          Approve Applications
        </button>

        <button
          onClick={() => setAdminView("admin-donation-receipts")}
          className="w-full sm:w-auto bg-red-900 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
        >
          Verify Donations
        </button>

      </div>

    </section>


    {/* Recent Activity */}
    <section className="px-4">

      <h2 className="text-lg sm:text-xl font-bold text-red-900 mb-4">
        Recent Admin Activity
      </h2>

      <div className="bg-white p-5 rounded-lg shadow">
        <p className="text-gray-700 text-sm sm:text-base">
          <span className="font-semibold text-red-900">
            Last Approved:
          </span>{" "}
          {stats.lastApproved}
        </p>
      </div>

    </section>

  </div>
);
};

export default AdminHome;