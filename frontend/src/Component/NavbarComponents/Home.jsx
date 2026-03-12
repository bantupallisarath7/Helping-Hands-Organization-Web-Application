import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Home = ({ setView }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [donatedAmount, setDonatedAmount] = useState(0);
  const [approvedCampaigns, setApprovedCampaigns] = useState([])
  const [pendingDonations, setPendingDonations] = useState([])
  const stats = {
    activeCampaigns: 12,
    savedCampaigns: 5,
    lastDonation: "₹2,000 to 'Books for Bihar'",
  };

  const fetchApprovedCampaigns = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/campaign/all", { withCredentials: true });
      if (res.data.success === false) {
        return toast.error(res.data.message)
      }
      setApprovedCampaigns(res.data.approvedCampaigns)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }

  const fetchPendingDonations = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/receipt/all", { withCredentials: true })
      if (res.data.success === false) {
        return toast.error(res.data.message)
      }
      setPendingDonations(res.data.pendingDonationReceipts)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }

  const fetchDonatedAmount = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/receipt/all/donatedamount", { withCredentials: true });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      setDonatedAmount(res.data.amount)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }
  useEffect(() => {
    fetchDonatedAmount()
    fetchApprovedCampaigns()
    fetchPendingDonations()
  }, [])

return (
  <div className="space-y-10 px-4 sm:px-6 lg:px-8 py-6">

    {/* Welcome Message */}
    <section className="text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-red-900">
        Welcome back, {currentUser.fullName}
      </h1>
      <p className="text-gray-600 mt-2 text-sm sm:text-base">
        Here's a quick look at your impact and activity.
      </p>
    </section>

    {/* Quick Stats */}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center">
        <h2 className="text-lg font-semibold text-red-900">
          Total Donations
        </h2>
        <p className="text-2xl font-bold mt-2 text-gray-800">
          ₹{donatedAmount.toLocaleString()}
        </p>
      </div>

      <div
        onClick={() => setView("mycampaigns")}
        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center"
      >
        <h2 className="text-lg font-semibold text-red-900">
          Active Campaigns
        </h2>
        <p className="text-2xl font-bold mt-2 text-gray-800">
          {approvedCampaigns.length}
        </p>
      </div>

      <div
        onClick={() => setView("donationreceipts")}
        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center"
      >
        <h2 className="text-lg font-semibold text-red-900">
          Pending Donations
        </h2>
        <p className="text-2xl font-bold mt-2 text-gray-800">
          {pendingDonations.length}
        </p>
      </div>

    </section>

    {/* Action Buttons */}
    <section className="flex flex-col sm:flex-row items-center justify-center gap-4">

      <button
        onClick={() => setView("campaignform")}
        className="w-full sm:w-auto bg-red-900 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition shadow"
      >
        Start New Campaign
      </button>

      <button
        onClick={() => setView("mydonations")}
        className="w-full sm:w-auto bg-red-900 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition shadow"
      >
        View My Donations
      </button>

    </section>

    {/* Recent Activity */}
    <section>

      <h2 className="text-lg sm:text-xl font-bold text-red-900 mb-4">
        Recent Activity
      </h2>

      <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
        <p className="text-gray-700 text-sm sm:text-base">
          <span className="font-semibold text-red-900">
            Last Donation:
          </span>{" "}
          {stats.lastDonation}
        </p>
      </div>

    </section>

  </div>
);
};

export default Home;