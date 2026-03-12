import { useEffect, useState } from "react";
import ProfilePhoto from "../Cards/ProfilePhoto";
import { MdCreate } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import EditProfileForm from "../Cards/EditProfileForm";
import { toast } from "react-toastify";

const Profile = ({ userId, role, setRefreshProfile }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const userIdToLoad = userId || currentUser?.userId;
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const isAdmin = role === "admin" ? true : false

  const getUserInfo = async () => {
    try {
      const res = await axios.get(`https://api-hho.onrender.com/auth/get/${userIdToLoad}`, {
        withCredentials: true
      });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
      setUserData(res.data.user);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false)
    }

  };

  useEffect(() => {
    getUserInfo();
  }, []);

if (loading) {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-red-700"></div>
    </div>
  );
} else {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-4 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Profile header */}
      <div className="bg-linear-to-r from-red-900 to-red-700 p-4 sm:p-6 text-white relative">
        <MdCreate
          title="Edit profile"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-xl sm:text-2xl text-white cursor-pointer hover:text-gray-200"
          onClick={() => setIsEditing(true)}
        />
        <div className="text-center space-y-2">
          <ProfilePhoto
            url={userData.profilePhotoUrl}
            refreshProfile={getUserInfo}
            setRefreshProfile={setRefreshProfile}
            userId={userId}
            set
          />
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{userData.fullName}</h2>
          <p className="text-xs sm:text-sm md:text-base capitalize">{userData.role}</p>
          {userData.isHHOMember && (
            <span className="inline-block bg-white text-red-500 text-xs px-3 py-1 rounded-full font-semibold shadow">
              HHO Member
            </span>
          )}
        </div>
      </div>

      {/* Profile details */}
      {isEditing ? (
        <EditProfileForm
          userData={userData}
          onClose={() => setIsEditing(false)}
          onUpdate={(updatedUser) => setUserData(updatedUser)}
          isAdmin={isAdmin}
        />
      ) : (
        <div className="px-4 sm:px-8 py-6 space-y-4 text-xs sm:text-sm md:text-base text-gray-900 text-center">
          <div>
            <label className="font-semibold text-gray-600 hover:text-red-700">Full Name:</label>
            <p>{userData.fullName}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600 hover:text-red-700">Email Address:</label>
            <p>{userData.email}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600 hover:text-red-700">Phone Number:</label>
            <p>{userData.phoneNumber || "—"}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-600 hover:text-red-700">DOB:</label>
            <p>{userData.dob ? dayjs(userData.dob).format("DD/MM/YYYY") : "—"}</p>
          </div>
          {!isAdmin && (
            <div>
              <label className="font-semibold text-gray-600 hover:text-red-700">Donated Amount:</label>
              <p className="text-green-600 font-semibold">
                ₹{userData.donatedAmount?.toLocaleString() || 0}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
};

export default Profile;