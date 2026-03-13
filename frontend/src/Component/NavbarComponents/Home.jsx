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
  <div className="flex-1 overflow-y-auto bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Welcome Section */}
      <section className="text-center">

        <h1 className="text-2xl sm:text-3xl font-bold text-red-900">
          Welcome back, {currentUser.fullName}
        </h1>

        <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
          Here's a quick look at your impact and activity.
        </p>

      </section>


      {/* Stats Section */}
      <section
        className="
        grid gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
      "
      >

        {/* Total Donations */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">

          <p className="text-sm font-medium text-gray-500">
            Total Donations
          </p>

          <p className="text-3xl font-bold text-red-900 mt-2">
            ₹{donatedAmount.toLocaleString()}
          </p>

        </div>


        {/* Active Campaigns */}
        <div
          onClick={() => setView("mycampaigns")}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center"
        >

          <p className="text-sm font-medium text-gray-500">
            Active Campaigns
          </p>

          <p className="text-3xl font-bold text-red-900 mt-2">
            {approvedCampaigns.length}
          </p>

        </div>


        {/* Pending Donations */}
        <div
          onClick={() => setView("donationreceipts")}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center"
        >

          <p className="text-sm font-medium text-gray-500">
            Pending Donations
          </p>

          <p className="text-3xl font-bold text-red-900 mt-2">
            {pendingDonations.length}
          </p>

        </div>

      </section>


      {/* Action Buttons */}
      <section className="flex flex-col sm:flex-row gap-4 justify-center items-center">

        <button
          onClick={() => setView("campaignform")}
          className="w-full sm:w-auto bg-red-900 text-white px-6 py-2.5 rounded-lg hover:bg-red-800 transition shadow-sm font-medium"
        >
          Start New Campaign
        </button>

        <button
          onClick={() => setView("mydonations")}
          className="w-full sm:w-auto bg-red-900 text-white px-6 py-2.5 rounded-lg hover:bg-red-800 transition shadow-sm font-medium"
        >
          View My Donations
        </button>

      </section>


      {/* Recent Activity */}
      <section className="space-y-4">

        <h2 className="text-lg sm:text-xl font-bold text-red-900 text-center">
          Recent Activity
        </h2>

        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition max-w-2xl mx-auto">

          <p className="text-gray-700 text-sm sm:text-base text-center">

            <span className="font-semibold text-red-900">
              Last Donation:
            </span>{" "}
            {stats.lastDonation}

          </p>

        </div>

      </section>

    </div>

  </div>
);
};

export default Home;