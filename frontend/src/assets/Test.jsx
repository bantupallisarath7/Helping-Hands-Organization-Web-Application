import React, { useState } from "react";
import CampaignCard from "../Component/Cards/CampaignCard";
import LiveCampaignCard from "../Component/Cards/LiveCampaignCard";

const TestCampaigns = () => {
  const [campaign, setCampaign] = useState({
    title: "Sujathamma Leg Operation",
    recipientName: "Sujathamma",
    requestedStudent: "Suresh",
    category: "Health",
    description: "My mother is suffering from a leg injury and needs urgent surgery.",
    amount: 25000,
    deadline: "25/12/2025",
    accountHolder: "Suresh",
    accountNumber: "123456789012",
    ifsc: "EXAMP0001234",
    upi: "EXAMP000@ybl",
    mobile: "7330935579",
    documents: "Health documents, medical bills",
    status: "Pending",
    isBookmarked: false,
    isEmergency:true
  });

  const handleEdit = () => {
    alert("Edit clicked");
  };

  const handleDelete = () => {
    alert("Delete clicked");
  };

  const handleBookmark = () => {
    setCampaign((prev) => ({
      ...prev,
      isBookmarked: !prev.isBookmarked
    }));
  };

  const handleApprove = () => {
    setCampaign((prev) => ({
      ...prev,
      status: "Approved"
    }));
  };

  const handleReject = () => {
    setCampaign((prev) => ({
      ...prev,
      status: "Rejected"
    }));
  };

  return (
    <div className="p-10 space-y-10">
      <h2 className="text-xl font-bold text-gray-700">User View</h2>
      <LiveCampaignCard
        campaign={campaign}
        isAdmin={false}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBookmark={handleBookmark}
      />

      <h2 className="text-xl font-bold text-gray-700">Admin View</h2>
      <LiveCampaignCard
        campaign={campaign}
        isAdmin={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBookmark={handleBookmark}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default TestCampaigns;