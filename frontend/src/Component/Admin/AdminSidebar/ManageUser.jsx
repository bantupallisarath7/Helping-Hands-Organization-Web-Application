import axios from "axios";
import { useEffect, useState } from "react";
import { MdEdit, MdDelete, MdToggleOn, MdToggleOff } from "react-icons/md";
import { toast } from "react-toastify";

const ManageUsers = ({ setAdminView, setSelectedUserId }) => {
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUser = async () => {
    try {
      const res = await axios.get("https://api-hho.onrender.com/admin/user/all", { withCredentials: true });
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
  <div className="flex-1 overflow-y-auto bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

      {/* Header */}
      <section className="text-center sm:text-left">

        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          Manage Users
        </h2>

        <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-2xl">
          View, edit and manage all registered users in the system.
        </p>

      </section>


      {/* Table Section */}
      <section className="min-h-[60vh]">

        <div className="w-full overflow-x-auto">

          <table className="min-w-[700px] w-full bg-white border border-gray-200 rounded-lg shadow-sm">

            {/* Table Head */}
            <thead className="bg-red-900 text-white">

              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-center font-medium">Actions</th>
              </tr>

            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">

              {allUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">

                  <td className="px-4 py-3 font-medium text-gray-800">
                    {user.fullName}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-4 py-3 capitalize text-gray-700">
                    {user.role}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center space-x-3">

                    <button
                      onClick={() => editUser(user._id)}
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="Edit"
                    >
                      <MdEdit size={18} />
                    </button>

                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete"
                    >
                      <MdDelete size={18} />
                    </button>

                    <button
                      onClick={() => toggleStatus(user._id, !user.isActive)}
                      className="text-gray-600 hover:text-gray-800 transition"
                      title="Toggle Status"
                    >
                      {user.isActive ? (
                        <MdToggleOn size={22} />
                      ) : (
                        <MdToggleOff size={22} />
                      )}
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>

  </div>
);
};

export default ManageUsers;