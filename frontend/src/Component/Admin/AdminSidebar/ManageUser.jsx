import axios from "axios";
import { useEffect, useState } from "react";
import { MdEdit, MdDelete, MdToggleOn, MdToggleOff } from "react-icons/md";
import { toast } from "react-toastify";

const ManageUsers = ({ setAdminView, setSelectedUserId }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://api-hho.onrender.com/admin/user/all", { withCredentials: true });
      if (res.data.success === false) {
        toast.error(res.data.message);
        return
      }
      setAllUsers(res.data.users)
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllUser()
  }, [])

  const toggleStatus = async (userId, newStatus) => {
    try {
      const res = await axios.put(`https://api-hho.onrender.com/auth/update/isactive/${userId}`, { isActive: newStatus }, { withCredentials: true });
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
      const res = await axios.delete(`https://api-hho.onrender.com/auth/delete/${userId}`, { withCredentials: true });
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
        <h2 className="text-xl font-bold text-red-900 text-center sm:text-left">
          Manage Users
        </h2>

        <p className="text-gray-500 text-sm sm:text-base text-center sm:text-left mt-1 max-w-2xl">
          View, edit and manage all registered users in the system.
        </p>
      </div>


      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-red-900"></div>
          <p className="text-gray-500 text-sm">Loading users...</p>
        </div>
      ) : allUsers.length === 0 ? (

        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            No Users Found
          </h3>
          <p className="text-gray-500 text-sm">
            There are no registered users yet.
          </p>
        </div>

      ) : (

        /* 🔴 TABLE SECTION (UNCHANGED — EXACT SAME CODE) */
        <div className="w-80 sm:w-auto md:w-auto lg:w-full overflow-x-auto">

          <table className="min-w-[600px] w-full bg-white border border-gray-200 rounded shadow">

            <thead className="bg-red-900 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>

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
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${user.isActive
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
                    >
                      <MdEdit />
                    </button>

                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdDelete />
                    </button>

                    <button
                      onClick={() => toggleStatus(user._id, !user.isActive)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      {user.isActive ? <MdToggleOn /> : <MdToggleOff />}
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default ManageUsers;