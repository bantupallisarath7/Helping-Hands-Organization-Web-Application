import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const EditProfileForm = ({ userData, onClose, onUpdate, isAdmin }) => {
  const [formData, setFormData] = useState({
    fullName: userData.fullName || "",
    email: userData.email || "",
    phoneNumber: userData.phoneNumber || "",
    dob: userData.dob ? dayjs(userData.dob).format("YYYY-MM-DD") : "",
    isHHOMember: userData.isHHOMember || false,
    donatedAmount: userData.donatedAmount || 0
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        "http://localhost:8815/auth/update/profile",
        {
          userId: userData._id,
          ...formData
        },
        { withCredentials: true }
      );
      if (res.data.success === false) {
        toast.error(res.data.message)
      }
      toast.success(res.data.message)
      onUpdate(res.data.user);
      onClose();
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4 text-sm text-gray-900">
      <h3 className="text-lg font-semibold mb-2">Edit Profile</h3>
      <div className="grid grid-cols-1 gap-4">
        <input
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 rounded focus:ring-1 focus:ring-red-900"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded focus:ring-1 focus:ring-red-900"
        />
        <input
          name="phoneNumber"
          type="text"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border p-2 rounded focus:ring-1 focus:ring-red-900"
        />
        <input
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          className="border p-2 rounded focus:ring-1 focus:ring-red-900"
        />

        {
          isAdmin && (
            <label className="flex items-center space-x-2">
              <input
                name="isHHOMember"
                type="checkbox"
                checked={formData.isHHOMember}
                onChange={handleChange}
              />
              <span>Are you an HHO Member?</span>
            </label>
          )
        }
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-700"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;