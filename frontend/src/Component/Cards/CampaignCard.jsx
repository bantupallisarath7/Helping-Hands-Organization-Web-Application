import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CampaignCard = ({ campaign, setDashboardView, setFormMode, setEditCampaign, refreshCampaigns }) => {
  const {
    title,
    recipient,
    student,
    category,
    description,
    amount,
    deadline,
    accountHolder,
    accountNumber,
    ifsc,
    upi,
    mobile,
    documents,
    status,
    isEmergency
  } = campaign;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser.role === "admin" ? true : false;


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onEdit = () => {
    setFormMode("edit")
    setEditCampaign(campaign);
    setDashboardView("campaignform");
  }
  const onDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:8815/campaign/delete/${campaign._id}`, { withCredentials: true });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      toast.success(res.data.message)
      refreshCampaigns()
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }


  const onApprove = async () => {

    try {
      const res = await axios.put(`http://localhost:8815/campaign/update/status/${campaign._id}`, { status: "approved" }, { withCredentials: true })
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      toast.success(res.data.message)
      refreshCampaigns()
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }

  const onReject = async () => {
    try {
      const res = await axios.put(`http://localhost:8815/campaign/update/status/${campaign._id}`, { status: "rejected" }, { withCredentials: true })
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      toast.success(res.data.message)
      refreshCampaigns()
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }
  const onFunded = async () => {
    try {
      const res = await axios.put(`http://localhost:8815/campaign/update/status/${campaign._id}`, { status: "funded" }, { withCredentials: true })
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      toast.success(res.data.message)
      refreshCampaigns()
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }
  const onEmergency = async () => {
    try {
      const res = await axios.put(`http://localhost:8815/campaign/update/emergency/status/${campaign._id}`, { isEmergency: !campaign.isEmergency }, { withCredentials: true })
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      toast.success(res.data.message)
      refreshCampaigns()
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }
  const statusColor = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-900";
      case "approved":
        return "bg-green-200 text-green-900";
      case "rejected":
        return "bg-red-200 text-red-900";
      case "funded":
        return "bg-green-200 text-green-900";
      default:
        return "bg-yellow-200 text-yellow-900";
    }
  }

return (
  <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition text-xs sm:text-sm md:text-base text-gray-800 space-y-4 relative w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
    <div className="flex justify-between items-start">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-red-800">
        Campaign Title:{" "}
        <span className="text-gray-900 font-semibold">{title}</span>
        {isEmergency && (
          <span className="ml-2 px-2 py-1 bg-red-600 text-white text-xs rounded-full">
            Emergency
          </span>
        )}
      </h3>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-gray-600 hover:text-gray-800 font-bold text-lg"
          title="Options"
        >
          <FaEllipsisV className="text-gray-600 text-sm hover:text-red-800" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-10">
            <button
              onClick={() => {
                onEdit();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onDelete();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white"
            >
              Delete
            </button>
            {isAdmin && (
              <button
                onClick={() => {
                  onEmergency();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white"
              >
                {isEmergency ? "Non-Emergency" : "Emergency"}
              </button>
            )}

            {isAdmin && (
              <>
                <button
                  onClick={() => {
                    onApprove();
                    setMenuOpen(false);
                    setDashboardView("manage-campaigns");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white"
                >
                  Approve
                </button>

                <button
                  onClick={() => {
                    onReject();
                    setMenuOpen(false);
                    setDashboardView("manage-campaigns");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white"
                >
                  Reject
                </button>

                <button
                  onClick={() => {
                    onFunded();
                    setMenuOpen(false);
                    setDashboardView("manage-campaigns");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white"
                >
                  Funded
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>

    <p>
      <span className="text-gray-500 font-semibold">Recipient Name:</span> {recipient}
    </p>
    <p>
      <span className="text-gray-500 font-semibold">Requested Student:</span> {student}
    </p>
    <p>
      <span className="text-gray-500 font-semibold">Category:</span> {category}
    </p>
    <p>
      <span className="text-gray-500 font-semibold">Description:</span> {description}
    </p>
    <p>
      <span className="text-gray-500 font-semibold">Amount Required:</span>{" "}
      <span className="text-green-700 font-semibold">₹{amount.toLocaleString()}</span>
    </p>
    <p>
      <span className="text-gray-500 font-semibold">Deadline:</span>
      <span className="text-red-600 font-semibold">
        {" " + dayjs(deadline).format("DD MMMM YYYY")}
      </span>
    </p>

    <div>
      <p className="text-gray-500 font-semibold">Account Details:</p>
      <div className="ml-4 space-y-1">
        <p>Account Holder Name: {accountHolder}</p>
        <p>Account Number: {accountNumber}</p>
        <p>IFSC Code: {ifsc}</p>
        <p>UPI: {upi}</p>
        <p>Mobile Number: {mobile}</p>
      </div>
    </div>

    <p className="text-gray-500 font-semibold">Documents:</p>
    <p>
      <span className="text-gray-500 font-semibold">Status:</span>{" "}
      <span
        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColor()}`}
      >
        {status}
      </span>
    </p>
  </div>
);
};

export default CampaignCard;