import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"

const DonationFormModal = ({ receipt, type, setView }) => {
  const [formData, setFormData] = useState(
    receipt ? {
      ...receipt,
      donationDate: receipt.donationDate?.slice(0, 10) || "",
    } :
      {
        donorName: "",
        campaignTitle: "",
        requestedStudent: "",
        transactionId: "",
        donatedAmount: "",
        donationDate: ""
      });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser.role === "admin" ? true : false;


  const validate = () => {
    if (!formData.donorName.trim()) {
      setError("Donor name is required");
      return false;
    }
    if (!formData.campaignTitle.trim()) {
      setError("Campaign title is required");
      return false;
    }
    if (!formData.requestedStudent.trim()) {
      setError("Requested student name is required");
      return false;
    }
    if (!formData.transactionId.trim()) {
      setError("Transaction ID is required");
      return false;
    }
    if (!formData.donatedAmount || Number(formData.donatedAmount) <= 0) {
      setError("Enter a valid donated amount");
      return false;
    }
    if (!formData.donationDate) {
      setError("Donation date is required");
      return false;
    }

    setError("");
    return true
  };

  const onEditReceipt = async () => {
    try {
      const res = await axios.put(`http://localhost:8815/receipt/update/${receipt._id}`, { ...formData }, { withCredentials: true });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      toast.success(res.data.message);
      setView(isAdmin ? "admin-donation-receipts" : "donationreceipts")
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }

  const onCreateReceipt = async () => {
    try {
      const res = await axios.post("http://localhost:8815/receipt/add", { ...formData, createdForCampaign: receipt.createdForCampaign }, { withCredentials: true })
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      setFormData({
        donorName: "",
        campaignTitle: "",
        requestedStudent: "",
        transactionId: "",
        donatedAmount: "",
        donationDate: ""
      });
      toast.success(res.data.message)
      setView("campaigns");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      if (type === "edit") {
        onEditReceipt();
      } else {
        onCreateReceipt();
      }
      setLoading(false);
    }
  };

return (
  <div className="flex items-center justify-center mt-4 px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl lg:max-w-4xl p-4 sm:p-6 space-y-4">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-red-700">
        Donation Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm md:text-base text-gray-800">
        {/* Donor Name */}
        <div>
          <label className="block font-medium text-gray-600">Name of Donor</label>
          <input
            type="text"
            value={formData.donorName}
            onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
            placeholder="Your full name"
          />
        </div>

        {/* Campaign Title */}
        <div>
          <label className="block font-medium text-gray-600">Campaign Title</label>
          <input
            type="text"
            value={formData.campaignTitle}
            onChange={(e) => setFormData({ ...formData, campaignTitle: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
            placeholder="Campaign name"
          />
        </div>

        {/* Requested Student */}
        <div>
          <label className="block font-medium text-gray-600">Requested Student</label>
          <input
            type="text"
            value={formData.requestedStudent}
            onChange={(e) => setFormData({ ...formData, requestedStudent: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
            placeholder="Student name"
          />
        </div>

        {/* Transaction ID */}
        <div>
          <label className="block font-medium text-gray-600">Payment Transaction ID</label>
          <input
            type="text"
            value={formData.transactionId}
            onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
            placeholder="Transaction ID"
          />
        </div>

        {/* Donated Amount */}
        <div>
          <label className="block font-medium text-gray-600">Donated Amount</label>
          <input
            type="number"
            value={formData.donatedAmount}
            onChange={(e) => setFormData({ ...formData, donatedAmount: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
            placeholder="₹"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium text-gray-600">Date</label>
          <input
            type="date"
            value={formData.donationDate}
            onChange={(e) => setFormData({ ...formData, donationDate: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
          />
        </div>

        {/* Error */}
        <p className="text-xs sm:text-sm mt-2 text-red-600">{error}</p>

        {/* Buttons */}
        <div className="flex justify-end flex-wrap gap-2 pt-4">
          <button
            type="button"
            onClick={() => {
              if (type === "edit") {
                setView(isAdmin ? "admin-donation-receipts" : "donationreceipts");
              } else {
                setView("campaigns");
              }
            }}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-700"
          >
            {loading ? "Submitting..." : type === "edit" ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default DonationFormModal;