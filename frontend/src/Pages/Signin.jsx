import { useState } from "react";
import { useDispatch } from "react-redux"
import axios from "axios";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";
import { toast } from "react-toastify";

const Signin = ({ setView, onLogin }) => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validate = () => {
    if (!formFields.email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formFields.email)) {
      setError("Email is invalid");
      return false;
    }
    if (!formFields.password) {
      setError("Password is required");
      return false;
    } else if (formFields.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formFields.role === "") {
      setError("Select the role");
      return false;
    }
    setError("");
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Signin api
      setLoading(true);
      try {
        dispatch(signInStart())
        const res = await axios.post("https://api-hho.onrender.com/auth/signin",
          {
            email: formFields.email,
            password: formFields.password,
            role: formFields.role
          },
          { withCredentials: true }
        );
        if (res.data.success === false) {
          toast.error(res.data.message)
          dispatch(signInFailure(res.data.message))
          setLoading(false);
          return
        }
        dispatch(signInSuccess(res.data.user));
        toast.success(res.data.message)
        setView("dashboard");
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
        toast.error(errorMsg);
        dispatch(signInFailure(error.message));
      }
      setLoading(false);
      onLogin(formFields.role);
    }
  };

return (
  <div className="flex-1 overflow-y-auto bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

    <div className="w-full max-w-md bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 sm:p-10 space-y-6">

      {/* Title */}
      <div className="text-center">

        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          Helping Hands
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Sign in to continue
        </p>

      </div>

      <form onSubmit={submitHandler} className="space-y-5">

        {/* Email */}
        <input
          type="email"
          value={formFields.email}
          placeholder="Enter your email"
          onChange={(e) =>
            setFormFields({ ...formFields, email: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition"
        />

        {/* Password */}
        <input
          type="password"
          value={formFields.password}
          placeholder="Enter your password"
          onChange={(e) =>
            setFormFields({ ...formFields, password: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-900/20 focus:border-red-900 transition"
        />

        {/* Role */}
        <div className="flex justify-center gap-8 pt-1">

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="role"
              value="user"
              checked={formFields.role === "user"}
              onChange={(e) =>
                setFormFields({ ...formFields, role: e.target.value })
              }
              className="accent-red-900"
            />
            <span className="text-gray-700 font-medium">User</span>
          </label>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={formFields.role === "admin"}
              onChange={(e) =>
                setFormFields({ ...formFields, role: e.target.value })
              }
              className="accent-red-900"
            />
            <span className="text-gray-700 font-medium">Admin</span>
          </label>

        </div>

        {error && (
          <p className="text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-900 text-white py-2 rounded-lg font-medium hover:bg-red-800 transition shadow-sm"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Not registered yet?{" "}
          <button
            type="button"
            onClick={() => setView("signup")}
            className="text-red-900 font-medium hover:underline"
          >
            Create an account
          </button>
        </p>

      </form>

    </div>

  </div>
);
};

export default Signin;