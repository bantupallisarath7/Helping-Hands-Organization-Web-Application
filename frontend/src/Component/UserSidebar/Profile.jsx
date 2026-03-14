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
  const isAdmin = role === "admin";

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
    if (userIdToLoad) {
      getUserInfo();
    }
  }, [userIdToLoad]);

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4">

            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-900"></div>

            <p className="text-gray-500 text-sm sm:text-base font-medium">
              Loading profile...
            </p>

          </div>

        </div>

      </div>);
  } else {
    return (
      <div className="flex-1 overflow-y-auto bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

          {/* Page Header */}
          <section className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-red-900">
              My Profile
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              View and manage your personal information.
            </p>
          </section>


          {/* Profile Card */}
          <section className="max-w-3xl mx-auto">

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden relative">

              {/* Profile Header */}
              <div className="bg-linear-to-r from-red-900 to-red-700 py-6 px-4 sm:px-6 text-white text-center relative">

                <MdCreate
                  title="Edit profile"
                  className="absolute top-3 right-3 text-xl cursor-pointer hover:text-gray-200"
                  onClick={() => setIsEditing(true)}
                />

                <div className="space-y-3">

                  <ProfilePhoto
                    url={userData.profilePhotoUrl}
                    refreshProfile={getUserInfo}
                    setRefreshProfile={setRefreshProfile}
                    userId={userIdToLoad}
                  />

                  <h3 className="text-lg sm:text-xl font-bold">
                    {userData.fullName}
                  </h3>

                  <p className="text-sm sm:text-base capitalize opacity-90">
                    {userData.role}
                  </p>

                  {userData.isHHOMember && (
                    <span className="inline-block bg-white text-red-700 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                      HHO Member
                    </span>
                  )}

                </div>

              </div>


              {/* Profile Details */}
              {isEditing ? (
                <EditProfileForm
                  userData={userData}
                  onClose={() => setIsEditing(false)}
                  onUpdate={(updatedUser) => setUserData(updatedUser)}
                  isAdmin={isAdmin}
                />
              ) : (

                <div className="p-6 sm:p-8 grid gap-6 sm:grid-cols-2 text-sm sm:text-base text-gray-800">

                  <div>
                    <p className="text-gray-500 text-sm">Full Name</p>
                    <p className="font-medium">{userData.fullName}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Email Address</p>
                    <p className="font-medium">{userData.email}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Phone Number</p>
                    <p className="font-medium">
                      {userData.phoneNumber || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Date of Birth</p>
                    <p className="font-medium">
                      {userData.dob
                        ? dayjs(userData.dob).format("DD/MM/YYYY")
                        : "—"}
                    </p>
                  </div>

                  {!isAdmin && (
                    <div className="sm:col-span-2">
                      <p className="text-gray-500 text-sm">Total Donated</p>
                      <p className="text-green-600 font-semibold text-lg">
                        ₹{userData.donatedAmount?.toLocaleString() || 0}
                      </p>
                    </div>
                  )}

                </div>

              )}

            </div>

          </section>

        </div>

      </div>
    );
  }
};

export default Profile;