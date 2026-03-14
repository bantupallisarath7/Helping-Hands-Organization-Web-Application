import { useEffect, useState } from "react";
import DonationReceiptCard from "../Cards/DonationReceiptCard";
import axios from "axios";
import { toast } from "react-toastify";


const DonationReceipts = ({ setView, setFormMode, setEditReceipt }) => {
  const [myReceipts, setMyReceipts] = useState({
    allDonationReceipts: [],
    pendingDonationReceipts: [],
    approvedDonationReceipts: [],
    rejectedDonationReceipts: [],
  })
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchReceipts = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/receipt/all", { withCredentials: true })
      if (res.data.success === false) {
        toast.error(res.data.message)
        return;
      }
      setMyReceipts({
        ...myReceipts,
        allDonationReceipts: [...res.data.receipts],
        pendingDonationReceipts: [...res.data.pendingDonationReceipts],
        approvedDonationReceipts: [...res.data.approvedDonationReceipts],
        rejectedDonationReceipts: [...res.data.rejectedDonationReceipts],
      })
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReceipts();
  }, [])
  const getReceipts = () => {
    switch (status) {
      case "pending":
        return myReceipts.pendingDonationReceipts;
      case "approved":
        return myReceipts.approvedDonationReceipts;
      case "rejected":
        return myReceipts.rejectedDonationReceipts;
      case "all":
        return myReceipts.allDonationReceipts;
      default:
        return myReceipts.allDonationReceipts;
    }
  };

return (
  <div className="flex-1 overflow-y-auto bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Header */}
      <section className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          My Donation Receipts
        </h2>

        <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-2xl mx-auto sm:mx-0">
          Review your submitted receipts by status. Track pending,
          approved, or rejected receipts easily.
        </p>
      </section>


      {/* Status Filters (CONSISTENT STYLE) */}
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

        </div>
      </section>


      {/* Receipts Content */}
      <section className="min-h-[60vh]">

        {loading ? (

          /* CONSISTENT SPINNER */
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">

            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-900"></div>

            <p className="text-gray-500 text-sm sm:text-base font-medium">
              Loading receipts...
            </p>

          </div>

        ) : getReceipts().length === 0 ? (

          <div className="flex flex-col items-center justify-center py-20 text-center">

            <div className="text-6xl mb-4">🧾</div>

            <h3 className="text-xl sm:text-2xl font-semibold text-red-900 mb-2">
              No {status} receipts found
            </h3>

            <p className="text-gray-500 text-sm max-w-md">
              You haven't submitted any{" "}
              {status === "all" ? "receipts" : status + " receipts"} yet.
            </p>

            <button
              onClick={() => {
                setLoading(true);
                fetchReceipts();
              }}
              className="mt-6 px-6 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-800 transition shadow-sm font-medium"
            >
              Refresh Receipts
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {getReceipts().map((receipt) => (
              <DonationReceiptCard
                key={receipt._id}
                receipt={receipt}
                setDashboardView={setView}
                setFormMode={setFormMode}
                setEditReceipt={setEditReceipt}
                refreshReceipts={fetchReceipts}
              />
            ))}

          </div>

        )}

      </section>

    </div>

  </div>
);
};

export default DonationReceipts;