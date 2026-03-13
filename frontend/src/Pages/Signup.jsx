import { useState } from "react";
import axios from "axios";

const Signup = ({ setView }) => {
  const [formFields, setFormFields] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!formFields.username.trim()) {
      setError("Username is required");
      return false;
    }
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
    setError("");
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate signup success
      setLoading(true)
      try {
        const res = await axios.post("https://api-hho.onrender.com/auth/signup",
          {
            fullName: formFields.username,
            email: formFields.email,
            password: formFields.password
          },
          {
            withCredentials: true
          });
        if (res.data.success === false) {
          setError(res.data.message);
          setLoading(false)
          return
        }
        setError("")
        console.log("Signup successful:", formFields);
        setView("signin");
      } catch (error) {
        console.log(error.message);
        setError(error.message)
      }
      setLoading(false)
    }
  };

return (
  <div className="flex-1 overflow-y-auto bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

    <div className="w-full max-w-md bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 sm:p-10 space-y-6">

      {/* Heading */}
      <div className="text-center">

        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          Create Account
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Sign up to start using the platform
        </p>

      </div>


      <form onSubmit={submitHandler} className="space-y-5">

        {/* Username */}
        <input
          type="text"
          value={formFields.username}
          placeholder="Enter your username"
          onChange={(e) =>
            setFormFields({ ...formFields, username: e.target.value })
          }
          className="
            w-full px-4 py-2
            border border-gray-200
            rounded-lg
            text-sm
            focus:outline-none
            focus:ring-2 focus:ring-red-900/20
            focus:border-red-900
            transition
          "
        />

        {/* Email */}
        <input
          type="email"
          value={formFields.email}
          placeholder="Enter your email"
          onChange={(e) =>
            setFormFields({ ...formFields, email: e.target.value })
          }
          className="
            w-full px-4 py-2
            border border-gray-200
            rounded-lg
            text-sm
            focus:outline-none
            focus:ring-2 focus:ring-red-900/20
            focus:border-red-900
            transition
          "
        />

        {/* Password */}
        <input
          type="password"
          value={formFields.password}
          placeholder="Enter your password"
          onChange={(e) =>
            setFormFields({ ...formFields, password: e.target.value })
          }
          className="
            w-full px-4 py-2
            border border-gray-200
            rounded-lg
            text-sm
            focus:outline-none
            focus:ring-2 focus:ring-red-900/20
            focus:border-red-900
            transition
          "
        />

        {/* Error */}
        {error && (
          <p className="text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-red-900 text-white
            py-2
            rounded-lg
            font-medium
            hover:bg-red-800
            transition
            shadow-sm
          "
        >
          {loading ? "Signing up..." : "Create Account"}
        </button>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600">

          Already have an account?{" "}

          <button
            type="button"
            onClick={() => setView("signin")}
            className="text-red-900 font-medium hover:underline"
          >
            Login
          </button>

        </p>

      </form>

    </div>

  </div>
);
};

export default Signup;