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
  <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-6">

    {/* Header */}
    <div className="max-w-7xl mx-auto w-full">
      <h2 className="text-lg sm:text-xl font-bold text-red-900 text-center sm:text-left">
        Manage Donation Receipts
      </h2>

      <p className="text-gray-500 text-sm sm:text-base text-center sm:text-left mt-1 max-w-2xl">
        Review and verify donation receipts submitted by users.
      </p>
    </div>

    {/* Filter Buttons */}
    <div className="max-w-7xl mx-auto w-full flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start font-medium">

      <button
        onClick={() => setStatus("all")}
        className={`px-4 py-2 rounded-full text-sm transition
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
        className={`px-4 py-2 rounded-full text-sm transition
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
        className={`px-4 py-2 rounded-full text-sm transition
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
        className={`px-4 py-2 rounded-full text-sm transition
        ${
          status === "rejected"
            ? "bg-red-200 text-gray-900"
            : "bg-gray-100 text-gray-700 hover:bg-red-200 hover:text-gray-900"
        }`}
      >
        Rejected
      </button>

    </div>

    {/* Receipts Section */}
    <div className="max-w-7xl mx-auto w-full flex-1 py-4">

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-200 border-t-red-700"></div>
        </div>

      ) : getReceipts().length === 0 ? (

        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="text-6xl mb-4">🧾</div>

          <h3 className="text-xl sm:text-2xl font-semibold text-red-900 mb-2">
            No {status} receipts found
          </h3>

          <p className="text-sm sm:text-base text-gray-500 max-w-md">
            Receipts submitted by users in this category will appear here.
          </p>

          <button
            onClick={() => {
              setLoading(true);
              fetchAllReceipts();
            }}
            className="mt-6 px-5 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-700 transition shadow"
          >
            Refresh Receipts
          </button>
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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

    </div>
  </div>
);
}
export default AdminDonationReceipts;