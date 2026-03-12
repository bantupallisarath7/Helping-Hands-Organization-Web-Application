import axios from "axios";
import { useEffect, useState } from "react";
import LiveCampaignCard from "../Cards/LiveCampaignCard";

const SavedCampaigns = ({ setView, setFormMode, setEditReceipt }) => {
  const [bookmarkedCampaigns, setBookmarkedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:8815/user/bookmarkedcampaigns", {
        withCredentials: true
      });
      setBookmarkedCampaigns(res.data.campaigns || []);
    } catch (error) {
      console.error("Failed to fetch bookmarked campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto py-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-700"></div>
        </div>
      ) : bookmarkedCampaigns.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
          <div className="text-6xl mb-4">🔖</div>
          <h3 className="text-2xl font-semibold text-red-900 mb-2">
            No bookmarked campaigns found
          </h3>
          <p className="text-sm text-gray-500 text-center max-w-md">
            You haven't saved any campaigns yet. Bookmark campaigns you care about to find them here later.
          </p>
          <button
            onClick={() => {
              setLoading(true);
              fetchCampaigns();
            }}
            className="mt-6 px-4 py-2 bg-red-900 text-white rounded hover:bg-red-700 transition"
          >
            Refresh Bookmarks
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 py-4">
          {bookmarkedCampaigns.map((campaign) => (
            <LiveCampaignCard
              key={campaign._id}
              campaign={campaign}
              isAdmin={false}
              onEdit={() => alert("Edit clicked")}
              onDelete={() => alert("Delete clicked")}
              onBookmark={() => alert("Bookmark toggled")}
              onAddAmount={() => alert("Add amount")}
              setView={setView}
              setFormMode={setFormMode}
              setEditReceipt={setEditReceipt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCampaigns;