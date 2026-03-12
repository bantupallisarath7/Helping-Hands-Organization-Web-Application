import { useEffect, useRef, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const DonationReceiptCard = ({ receipt, setDashboardView, setFormMode, setEditReceipt, refreshReceipts }) => {
  const {
    campaignTitle,
    requestedStudent,
    donorName,
    transactionId,
    donatedAmount,
    donationDate,
    status
  } = receipt;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser.role === "admin" ? true : false

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
    setEditReceipt(receipt);
    setDashboardView("donationform")
  }
  const onDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:8815/receipt/delete/${receipt._id}`, { withCredentials: true });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      toast.success(res.data.message)
      refreshReceipts()
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }

  const onApprove = async () => {
    try {
      const res = await axios.put(`http://localhost:8815/receipt/update/status/${receipt._id}`, { status: "approved" }, { withCredentials: true })

      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      toast.success(res.data.message)
      refreshReceipts()
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };
  const onReject = async () => {
    try {
      const res = await axios.put(`http://localhost:8815/receipt/update/status/${receipt._id}`, { status: "rejected" }, { withCredentials: true })
      refreshReceipts()
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      toast.success(res.data.message);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  const statusColor = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-900";
      case "approved":
        return "bg-green-200 text-green-900";
      case "rejected":
        return "bg-red-200 text-red-900";
      default:
        return "bg-yellow-200 text-yellow-900";
    }
  }


return (
  <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition 
                  text-xs sm:text-sm md:text-base text-gray-800 space-y-4 
                  w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
    <div className="flex justify-between items-start">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-red-800">
        Campaign Title:{" "}
        <span className="text-gray-900 font-semibold">{campaignTitle}</span>
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
                refreshReceipts();
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
              <>
                <button
                  onClick={() => {
                    onApprove();
                    setMenuOpen(false);
                    setDashboardView("admin-donation-receipts");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white"
                >
                  Approve
                </button>

                <button
                  onClick={() => {
                    onReject();
                    setMenuOpen(false);
                    setDashboardView("admin-donation-receipts");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white"
                >
                  Reject
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>

    <p><span className="text-gray-500 font-semibold">Requested Student:</span> {requestedStudent}</p>
    <p><span className="text-gray-500 font-semibold">Donor Name:</span> {donorName}</p>
    <p><span className="text-gray-500 font-semibold">Transaction ID:</span> {transactionId}</p>
    <p>
      <span className="text-gray-500 font-semibold">Donated Amount:</span>
      <span className="text-green-700 font-semibold"> ₹{donatedAmount.toLocaleString()}</span>
    </p>
    <p>
      <span className="text-gray-500 font-semibold">Donation Date:</span>
      <span className="text-red-600 font-semibold">{" " + dayjs(donationDate).format("DD MMMM YYYY")}</span>
    </p>

    <p>
      <span className="text-gray-500 font-semibold">Status:</span>{" "}
      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColor()}`}>
        {status}
      </span>
    </p>
  </div>
);
};

export default DonationReceiptCard;