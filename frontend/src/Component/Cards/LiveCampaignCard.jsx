import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const LiveCampaignCard = ({
  isAdmin,
  campaign,
  onEdit,
  onDelete,
  onBookmark,
  onAddAmount,
  setView,
  setFormMode,
  setEditReceipt
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [isEmergency, setIsEmergency] = useState(campaign.isEmergency || false);
  const menuRef = useRef();
  const currentUser = useSelector((state) => state.user.currentUser);

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
    collectedAmount,
    isBookmarked,

  } = campaign;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDonateClick = () => {
    if (!currentUser) {
      toast.info("Please sign in to donate");
      return
    }
    setFormMode("add");
    setEditReceipt({
      donorName: "",
      campaignTitle: title,
      requestedStudent: student,
      transactionId: "",
      donatedAmount: "",
      donationDate: "",
      createdForCampaign: campaign._id
    });
    setView("donationform");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition text-sm text-gray-800 space-y-4 relative">
      {/* Title + Admin Menu */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-red-800">
          Campaign Title:{" "}
          <span className="text-gray-900 font-semibold">{title}</span>
          {isEmergency && (
            <span className="ml-2 px-2 py-1 bg-red-600 text-white text-xs rounded-full">Emergency</span>
          )}
        </h3>

        {isAdmin && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-xl font-bold text-gray-700 hover:text-red-900"
              title="Admin Options"
            >
              <FaEllipsisV className="text-gray-600 text-sm  hover:text-red-800" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-md z-10">
                <button onClick={() => { onEdit(); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white">Edit</button>
                <button onClick={() => { onDelete(); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white">Delete</button>
                <button onClick={() => { onBookmark(); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white">
                  {isBookmarked ? "Unbookmark" : "Save Bookmark"}
                </button>
                <button
                  onClick={() => {
                    setIsEmergency((prev) => !prev);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-red-900 hover:text-white"
                >
                  {isEmergency ? "Remove Emergency" : "Mark as Emergency"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Campaign Details */}
      <p><span className="text-gray-500 font-semibold">Recipient Name:</span> {recipient}</p>
      <p><span className="text-gray-500 font-semibold">Requested Student:</span> {student}</p>
      <p><span className="text-gray-500 font-semibold">Category:</span> {category}</p>
      <p><span className="text-gray-500 font-semibold">Description:</span> {description}</p>
      <p><span className="text-gray-500 font-semibold">Amount Required:</span> <span className="text-green-700 font-semibold">₹{amount.toLocaleString()}</span></p>
      <p><span className="text-gray-500 font-semibold">Deadline:</span> <span className="text-red-600 font-semibold">{" " + dayjs(deadline).format("DD MMMM YYYY")}</span></p>

      {/* Account Details */}
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

      {/* Donate + Collected Amount + Add Amount */}
      <div className="flex justify-between items-center mt-6">
        {/* Donate Button */}
        <button
          onClick={handleDonateClick}
          title="Please fill out this form after completing the payment."
          className="bg-red-700 text-white px-4 py-2 rounded shadow hover:bg-red-800 transition text-sm font-medium"
        >
          Donate
        </button>

        {/* Collected Amount + Add Amount */}
        <div className="flex items-center gap-2">
          <p className="bg-green-600 text-white px-4 py-2 rounded shadow text-sm font-medium">
            Collected: ₹{collectedAmount.toLocaleString()}
          </p>
          {isAdmin && (
            <>
              <input
                type="number"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                placeholder="Add ₹"
                className="w-20 px-2 py-1 border rounded text-sm"
              />
              <button
                onClick={() => {
                  if (addAmount) {
                    onAddAmount(Number(addAmount));
                    setAddAmount("");
                  }
                }}
                className="bg-green-700 text-white px-2 py-1 rounded text-sm hover:bg-green-800"
              >
                Add
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveCampaignCard;