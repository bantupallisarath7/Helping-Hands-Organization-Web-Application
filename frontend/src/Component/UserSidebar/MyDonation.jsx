import { useState } from "react";
import Donation from "../Cards/Donation";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const MyDonations = () => {
    const [myDonations, setMyDonations] = useState([]);
    const [donatedAmount, setDonatedAmount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchDonations = async () => {
        try {
            const res = await axios.get("https://api-hho.onrender.com/receipt/all", { withCredentials: true });
            if (res.data.success === false) {
                toast.error(res.data.message);
                return
            }
            setMyDonations(res.data.approvedDonationReceipts);
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }
    const fetchDonationAmount = async () => {
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
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDonations();
        fetchDonationAmount();
    }, [])


return (
  <div className="flex-1 overflow-y-auto bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Heading */}
      <div className="text-center sm:text-left">

        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          My Donations
        </h2>

        <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-2xl">
          Track your contributions, view receipts, and celebrate the impact
          you've made by supporting campaigns.
        </p>

      </div>


      {/* Floating total */}
      <p className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium z-50">
        Total: ₹{donatedAmount.toLocaleString()}
      </p>


      {/* Content Wrapper (prevents layout jump) */}
      <div className="min-h-[60vh] flex flex-col">

        {loading ? (

          <div className="flex flex-1 flex-col items-center justify-center">

            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-900"></div>

            <p className="text-gray-500 mt-4 text-sm">
              Loading donations...
            </p>

          </div>

        ) : myDonations.length === 0 ? (

          /* Empty State */
          <div className="flex flex-1 flex-col items-center justify-center text-center">

            <div className="text-6xl mb-4">🧾</div>

            <h3 className="text-xl sm:text-2xl font-semibold text-red-900 mb-2">
              You haven't made any donations yet
            </h3>

            <p className="text-gray-500 max-w-md text-sm sm:text-base">
              Once you donate, your receipts will appear here.
              Start supporting a campaign today!
            </p>

            <button
              onClick={() => {
                setLoading(true);
                fetchDonations();
                fetchDonationAmount();
              }}
              className="mt-6 px-6 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-800 transition shadow-sm font-medium"
            >
              Refresh Donations
            </button>

          </div>

        ) : (

          /* Donations Grid */
          <div
            className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            items-start
          "
          >

            {myDonations.map((donation) => (
              <Donation key={donation._id} data={donation} />
            ))}

          </div>

        )}

      </div>

    </div>

  </div>
);
}
export default MyDonations;
