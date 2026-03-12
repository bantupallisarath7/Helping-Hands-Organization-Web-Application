import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CampaignForm = ({ campaign, type, setView }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser.role === "admin" ? true : false
  const [formField, setformField] = useState(
    campaign ? {
      ...campaign,
      deadline: campaign.deadline?.slice(0, 10) || "",
    } : {
      title: "",
      recipient: "",
      student: "",
      category: "Health",
      description: "",
      amount: "",
      deadline: "",
      accountHolder: "",
      accountNumber: "",
      ifsc: "",
      upi: "",
      mobile: "",
    });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const validate = () => {
    const newErrors = {};

    if (!formField.title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!formField.recipient.trim()) {
      setError("Recipient name is required");
      return false;
    }
    if (!formField.student.trim()) {
      setError("Requested student is required");
      return false;
    }
    if (!formField.description.trim()) {
      setError("Description is required");
      return false;
    }
    if (!formField.amount || Number(formField.amount) <= 0) {
      setError("Enter a valid amount");
      return false;
    }
    if (!formField.deadline) {
      setError("Deadline is required");
      return false;
    }
    if (!formField.accountHolder.trim()) {
      setError("Account holder name is required");
      return false;
    }
    if (!formField.accountNumber.trim()) {
      setError("Account number is required");
      return false;
    }
    if (!formField.ifsc.trim()) {
      setError("IFSC code is required");
      return false;
    }
    if (!formField.upi.trim()) {
      setError("UPI is required");
      return false;
    }
    if (!formField.mobile.trim() || formField.mobile.length !== 10) {
      setError("Valid mobile number required");
      return false;
    }
    setError("");
    return true
  };

  const onEditCampaign = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`https://api-hho.onrender.com/campaign/update/${campaign._id}`, { ...formField }, { withCredentials: true });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      toast.success(res.data.message);
      setView(isAdmin ? "manage-campaigns" : "mycampaigns")
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  const onCreateCampaign = async () => {
    try {
      setLoading(true);
      const res = await axios.post("https://api-hho.onrender.com/campaign/add", { ...formField }, { withCredentials: true })
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      toast.success(res.data.message);
      setformField({
        title: "",
        recipient: "",
        student: "",
        category: "Health",
        description: "",
        amount: "",
        deadline: "",
        accountHolder: "",
        accountNumber: "",
        ifsc: "",
        upi: "",
        mobile: "",
      });
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }


  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (validate()) {

      if (type === "edit") {
        onEditCampaign();
      } else {
        onCreateCampaign();
      }
    }
  }
return (
  <div className="mt-4 px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="max-w-7xl mx-auto mb-6 w-full">
      <h2 className="text-md sm:text-lg md:text-md font-bold text-red-900 text-center sm:text-left">
        {type === "edit" ? "Update Campaign" : "Create Campaign"}
      </h2>
      <p className="text-gray-500 text-sm sm:text-base text-center sm:text-left mt-1">
        Fill in the details below to {type === "edit" ? "update your existing campaign" : "create a new campaign"} and start making an impact.
      </p>
    </div>

    {/* Form */}
    <form
      onSubmit={onSubmitHandler}
      className="bg-white shadow-md rounded-lg p-6 border border-gray-200 space-y-4 text-sm sm:text-base text-gray-800 W-full"
    >
      {/* Campaign Title */}
      <div>
        <label className="block font-medium text-gray-500">Campaign Title</label>
        <input
          type="text"
          value={formField.title}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
          placeholder="Sujathamma Leg Operation"
          onChange={(e) => setformField({ ...formField, title: e.target.value })}
        />
      </div>

      {/* Recipient Name */}
      <div>
        <label className="block font-medium text-gray-500">Recipient Name</label>
        <input
          type="text"
          value={formField.recipient}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
          placeholder="Sujathamma"
          onChange={(e) => setformField({ ...formField, recipient: e.target.value })}
        />
      </div>

      {/* Requested Student */}
      <div>
        <label className="block font-medium text-gray-500">Requested Student</label>
        <input
          type="text"
          value={formField.student}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
          placeholder="Suresh"
          onChange={(e) => setformField({ ...formField, student: e.target.value })}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium text-gray-500">Category</label>
        <select
          value={formField.category}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
          onChange={(e) => setformField({ ...formField, category: e.target.value })}
        >
          <option>Health</option>
          <option>Education</option>
          <option>Supplies</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium text-gray-500">Description</label>
        <textarea
          value={formField.description}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
          rows="3"
          placeholder="Describe the situation..."
          onChange={(e) => setformField({ ...formField, description: e.target.value })}
        ></textarea>
      </div>

      {/* Amount Required */}
      <div>
        <label className="block font-medium text-gray-500">Amount Required</label>
        <input
          type="number"
          value={formField.amount}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
          placeholder="25000"
          onChange={(e) => setformField({ ...formField, amount: e.target.value })}
        />
      </div>

      {/* Deadline */}
      <div>
        <label className="block font-medium text-gray-500">Deadline</label>
        <input
          type="date"
          value={formField.deadline}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
          onChange={(e) => setformField({ ...formField, deadline: e.target.value })}
        />
      </div>

      {/* Account Holder Name */}
      <div>
        <label className="block font-medium text-gray-500">Account Holder Name</label>
        <input
          type="text"
          value={formField.accountHolder}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
          placeholder="Suresh"
          onChange={(e) => setformField({ ...formField, accountHolder: e.target.value })}
        />
      </div>

      {/* Account Number */}
      <div>
        <label className="block font-medium text-gray-500">Account Number</label>
        <input
          type="text"
          value={formField.accountNumber}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
          placeholder="xxxxxxx9012"
          onChange={(e) => setformField({ ...formField, accountNumber: e.target.value })}
        />
      </div>

      {/* IFSC Code */}
      <div>
        <label className="block font-medium text-gray-500">IFSC Code</label>
        <input
          type="text"
          value={formField.ifsc}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
          placeholder="SBI00xxxx"
          onChange={(e) => setformField({ ...formField, ifsc: e.target.value })}
        />
      </div>

      {/* UPI */}
      <div>
        <label className="block font-medium text-gray-500">UPI</label>
        <input
          type="text"
          value={formField.upi}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
          placeholder="xxxxxx@ybl"
          onChange={(e) => setformField({ ...formField, upi: e.target.value })}
        />
      </div>

      {/* Mobile Number */}
      <div>
        <label className="block font-medium text-gray-500">Mobile Number</label>
        <input
          type="number"
          value={formField.mobile}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-900"
          placeholder="xxxxxx5579"
          onChange={(e) => setformField({ ...formField, mobile: e.target.value })}
        />
      </div>

      {/* Error message */}
      <p className="text-sm mt-2 text-red-600">{error}</p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : type === "edit" ? "Update Campaign" : "Create Campaign"}
        </button>
        {type === "edit" && (
          <button
            type="button"
            onClick={() => setView(isAdmin ? "manage-campaigns" : "mycampaigns")}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  </div>
);
};

export default CampaignForm;