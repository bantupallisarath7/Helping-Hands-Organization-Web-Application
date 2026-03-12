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
        const res = await axios.post("http://localhost:8815/auth/signup",
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
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

      {/* Heading */}
      <div className="text-center mb-6">
        <h4 className="text-xl font-bold text-gray-800">Create Account</h4>
        <p className="text-sm text-gray-500 mt-1">
          Sign up to start using the platform
        </p>
      </div>

      <form onSubmit={submitHandler} className="space-y-5">

        {/* Username */}
        <div>
          <input
            type="text"
            value={formFields.username}
            placeholder="Enter your username"
            onChange={(e) =>
              setFormFields({ ...formFields, username: e.target.value })
            }
            className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 transition"
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            value={formFields.email}
            placeholder="Enter your email"
            onChange={(e) =>
              setFormFields({ ...formFields, email: e.target.value })
            }
            className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 transition"
          />
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            value={formFields.password}
            placeholder="Enter your password"
            onChange={(e) =>
              setFormFields({ ...formFields, password: e.target.value })
            }
            className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800 transition"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-900 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
        >
          {loading ? "Signing up..." : "Create Account"}
        </button>

        {/* Login */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setView("signin")}
            className="text-red-800 font-semibold hover:underline"
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