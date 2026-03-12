import axios from "axios";
import { useEffect, useState } from "react";
import { MdEdit, MdDelete, MdToggleOn, MdToggleOff } from "react-icons/md";
import { toast } from "react-toastify";

const ManageUsers = ({ setAdminView, setSelectedUserId }) => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUser = async () => {
    try {
      const res = await axios.get("http://localhost:8815/admin/user/all", { withCredentials: true });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      setAllUsers(res.data.users)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }

  useEffect(() => {
    fetchAllUser()
  }, [])

  const toggleStatus = async (userId, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:8815/auth/update/isactive/${userId}`, { isActive: newStatus }, { withCredentials: true });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      toast.success(res.data.message);
      fetchAllUser()
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(`http://localhost:8815/auth/delete/${userId}`, { withCredentials: true });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      toast.success(res.data.message);
      fetchAllUser()
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  const editUser = (userId) => {
    setSelectedUserId(userId);
    setAdminView("admin-profile")

  };

return (
  <div className="p-6">

    {/* Header */}
    <div className="mb-6">
      <h2 className="text-lg sm:text-xl font-bold text-red-900 text-center sm:text-left">Manage Users</h2>
      <p className="text-gray-500 text-sm sm:text-base text-center sm:text-left mt-1 max-w-2xl">
        View, edit and manage all registered users in the system.
      </p>
    </div>

    {/* Responsive Container */}
    <div className="w-80 sm:w-auto md:w-auto lg:w-full overflow-x-auto">

      <table className="min-w-[600px] w-full bg-white border border-gray-200 rounded shadow">

        {/* Table Head */}
        <thead className="bg-red-900 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {allUsers.map((user) => (
            <tr key={user._id} className="border-t">

              <td className="px-4 py-2">{user.fullName}</td>

              <td className="px-4 py-2">{user.email}</td>

              <td className="px-4 py-2 capitalize">
                {user.role}
              </td>

              <td className="px-4 py-2">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    user.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </td>

              <td className="px-4 py-2 text-center space-x-2">

                <button
                  onClick={() => editUser(user._id)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <MdEdit />
                </button>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <MdDelete />
                </button>

                <button
                  onClick={() => toggleStatus(user._id, !user.isActive)}
                  className="text-gray-600 hover:text-gray-800"
                  title="Toggle Status"
                >
                  {user.isActive ? <MdToggleOn /> : <MdToggleOff />}
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>

  </div>
);
};

export default ManageUsers;