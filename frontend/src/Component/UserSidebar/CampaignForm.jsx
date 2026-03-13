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
  <div className="flex-1 overflow-y-auto bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Header */}
      <section className="text-center sm:text-left">

        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          {type === "edit" ? "Update Campaign" : "Create Campaign"}
        </h2>

        <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-2xl">
          Fill in the details below to{" "}
          {type === "edit"
            ? "update your existing campaign"
            : "create a new campaign"}{" "}
          and start making an impact.
        </p>

      </section>


      {/* Form Card */}
      <form
        onSubmit={onSubmitHandler}
        className="bg-white rounded-xl shadow-sm p-6 sm:p-8 space-y-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Campaign Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Campaign Title
            </label>
            <input
              type="text"
              value={formField.title}
              placeholder="Sujathamma Leg Operation"
              onChange={(e) =>
                setformField({ ...formField, title: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            />
          </div>


          {/* Recipient */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              value={formField.recipient}
              placeholder="Sujathamma"
              onChange={(e) =>
                setformField({ ...formField, recipient: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            />
          </div>


          {/* Requested Student */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Requested Student
            </label>
            <input
              type="text"
              value={formField.student}
              placeholder="Suresh"
              onChange={(e) =>
                setformField({ ...formField, student: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            />
          </div>


          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              value={formField.category}
              onChange={(e) =>
                setformField({ ...formField, category: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            >
              <option>Health</option>
              <option>Education</option>
              <option>Supplies</option>
            </select>
          </div>


          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Amount Required
            </label>
            <input
              type="number"
              value={formField.amount}
              placeholder="25000"
              onChange={(e) =>
                setformField({ ...formField, amount: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            />
          </div>


          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Deadline
            </label>
            <input
              type="date"
              value={formField.deadline}
              onChange={(e) =>
                setformField({ ...formField, deadline: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            />
          </div>


          {/* Account Holder */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Account Holder Name
            </label>
            <input
              type="text"
              value={formField.accountHolder}
              placeholder="Suresh"
              onChange={(e) =>
                setformField({ ...formField, accountHolder: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            />
          </div>


          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Account Number
            </label>
            <input
              type="text"
              value={formField.accountNumber}
              placeholder="xxxxxxx9012"
              onChange={(e) =>
                setformField({ ...formField, accountNumber: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            />
          </div>


          {/* IFSC */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              IFSC Code
            </label>
            <input
              type="text"
              value={formField.ifsc}
              placeholder="SBI00XXXX"
              onChange={(e) =>
                setformField({ ...formField, ifsc: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            />
          </div>


          {/* UPI */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              UPI
            </label>
            <input
              type="text"
              value={formField.upi}
              placeholder="xxxx@ybl"
              onChange={(e) =>
                setformField({ ...formField, upi: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            />
          </div>


          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Mobile Number
            </label>
            <input
              type="number"
              value={formField.mobile}
              placeholder="xxxxxxxx79"
              onChange={(e) =>
                setformField({ ...formField, mobile: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            />
          </div>

        </div>


        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            rows="4"
            value={formField.description}
            placeholder="Describe the situation..."
            onChange={(e) =>
              setformField({ ...formField, description: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
          />
        </div>


        {/* Error */}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}


        {/* Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">

          <button
            type="submit"
            disabled={loading}
            className="bg-red-900 text-white px-6 py-2.5 rounded-lg hover:bg-red-800 transition shadow-sm font-medium"
          >
            {loading
              ? "Submitting..."
              : type === "edit"
              ? "Update Campaign"
              : "Create Campaign"}
          </button>

          {type === "edit" && (
            <button
              type="button"
              onClick={() =>
                setView(isAdmin ? "manage-campaigns" : "mycampaigns")
              }
              className="px-6 py-2.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </div>

  </div>
);
};

export default CampaignForm;