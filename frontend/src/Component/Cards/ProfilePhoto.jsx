import { useState, useRef, useEffect } from "react";
import { FaPlus, FaTrash, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify"

const ProfilePhoto = ({ url, refreshProfile, setRefreshProfile, userId }) => {
  const fileInputRef = useRef();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await axios.post(`http://localhost:8815/auth/upload/profile-photo/${userId}`, formData, {
        withCredentials: true
      });

      if (res.data.success === false) {
        return toast.error(res.data.message)
      }
      toast.success(res.data.message);
      refreshProfile()
      setRefreshProfile(true)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:8815/auth/delete/profile-photo/${userId}`, { withCredentials: true })
      if (res.data.success === false) {
        return toast.error(res.data.message)
      }
      toast.success(res.data.message);
      refreshProfile()
      setRefreshProfile(true)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="relative w-32 h-32 mx-auto">
      <div className="w-full h-full rounded-full bg-white border-2 border-red-900 flex items-center justify-center overflow-hidden">
        {url ? (
          <img
            src={`http://localhost:8815${url}`}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <FaUserCircle className="text-red-900 text-8xl" />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={handleUploadClick}
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-red-900 text-white p-2 rounded-full shadow hover:bg-blue-600"
        title="Upload Photo"
      >
        <FaPlus size={14} />
      </button>

      {url && (
        <button
          onClick={handleDelete}
          className="absolute bottom-0 right-0 bg-red-900 text-white p-2 rounded-full shadow hover:bg-red-600"
          title="Delete Photo"
        >
          <FaTrash size={14} />
        </button>
      )}
    </div>
  );
};

export default ProfilePhoto;