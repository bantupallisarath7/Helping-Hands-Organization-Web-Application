import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const TopDonors = () => {
  const [topDonors, setTopDonors] = useState([]);

  useEffect(() => {
    const fetchTopDonors = async () => {
      try {
        const res = await axios.get("https://api-hho.onrender.com/admin/top-donors", {
          withCredentials: true,
        });
        if (res.data.success === false) {
          return toast.error(res.data.message);
        }
        setTopDonors(res.data.donors);
      } catch (error) {
        const errorMsg =
          error.response?.data?.message || error.message || "Something went wrong";
        toast.error(errorMsg);
      }
    };
    fetchTopDonors();
  }, []);

  return (
    <div className="py-12 px-6 bg-white text-center">
      <h2 className="text-2xl font-bold text-red-900 mb-8">Top Donors</h2>
      {topDonors.length === 0 ? (
        <p className="text-gray-500 text-md">
          No top donors to display at the moment. Please check back later.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {topDonors.map((donor, index) => (
            <div
              key={index}
              className="bg-red-100 p-6 rounded shadow hover:shadow-xl transition text-center"
            >
              <div className="flex justify-center mb-4">
                {donor.photo ? (
                  <img
                    src={donor.photo}
                    alt={donor.name}
                    loading="lazy"
                    className="w-20 h-20 rounded-full object-cover border-2 border-red-900"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <FaUserCircle className="text-7xl text-red-900" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-red-900">{donor.name}</h3>
              <p className="text-green-700 font-semibold">
                ₹{donor.amount ? donor.amount.toLocaleString() : 0}
              </p>
              <p className="text-gray-600 text-xs">
                Total Contribution
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopDonors;