import { useEffect, useState } from "react";
import DonationReceiptCard from "../../Cards/DonationReceiptCard";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDonationReceipts = ({ setAdminView, setFormMode, setEditReceipt }) => {
  const [allReceipts, setAllReceipts] = useState({
    allReceipts: [],
    pendingReceipts: [],
    approvedReceipts: [],
    rejectedReceipts: [],
  });
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchAllReceipts = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/admin/receipt/all", { withCredentials: true });
      if (res.data.status === false) {
        toast.error(res.data.message)
        return
      }
      setAllReceipts({
        ...allReceipts,
        allReceipts: [...res.data.receipts],
        pendingReceipts: [...res.data.pendingReceipts],
        approvedReceipts: [...res.data.approvedReceipts],
        rejectedReceipts: [...res.data.rejectedReceipts],
      })
      // toast.success(res.data.message)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchAllReceipts()
  }, [])

  const getReceipts = () => {
    switch (status) {
      case "pending":
        return allReceipts.pendingReceipts;
      case "approved":
        return allReceipts.approvedReceipts;
      case "rejected":
        return allReceipts.rejectedReceipts;
      case "all":
        return allReceipts.allReceipts;
      default:
        return allReceipts.allReceipts;
    }
  };
return (
  <div className="flex-1 overflow-y-auto bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Header */}
      <section className="text-center sm:text-left">

        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          Manage Donation Receipts
        </h2>

        <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-2xl">
          Review and verify donation receipts submitted by users.
        </p>

      </section>


      {/* Filter Buttons */}
      <section>

        <div className="flex flex-wrap gap-3 justify-center sm:justify-start font-medium">

          <button
            onClick={() => setStatus("all")}
            className={`px-4 py-2 rounded-full text-sm transition
            ${status === "all"
                ? "bg-red-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
          >
            All
          </button>

          <button
            onClick={() => setStatus("pending")}
            className={`px-4 py-2 rounded-full text-sm transition
            ${status === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
          >
            Pending
          </button>

          <button
            onClick={() => setStatus("approved")}
            className={`px-4 py-2 rounded-full text-sm transition
            ${status === "approved"
                ? "bg-green-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
          >
            Approved
          </button>

          <button
            onClick={() => setStatus("rejected")}
            className={`px-4 py-2 rounded-full text-sm transition
            ${status === "rejected"
                ? "bg-red-500 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
          >
            Rejected
          </button>

        </div>

      </section>


      {/* Receipts Section */}
      <section className="min-h-[60vh]">

        {loading ? (

          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">

            {/* Spinner */}
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
              Receipts submitted by users in this category will appear here.
            </p>

            <button
              onClick={() => {
                setLoading(true);
                fetchAllReceipts();
              }}
              className="mt-6 px-6 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-800 transition shadow-sm font-medium"
            >
              Refresh Receipts
            </button>

          </div>

        ) : (

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

            {getReceipts().map((receipt) => (
              <DonationReceiptCard
                key={receipt._id}
                receipt={receipt}
                setDashboardView={setAdminView}
                setFormMode={setFormMode}
                setEditReceipt={setEditReceipt}
                refreshReceipts={fetchAllReceipts}
              />
            ))}

          </div>

        )}

      </section>

    </div>
  </div>
);
}
export default AdminDonationReceipts;