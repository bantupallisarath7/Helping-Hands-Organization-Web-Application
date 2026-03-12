import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaUserGraduate, FaRupeeSign, FaCalendarAlt, FaHandsHelping, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { toast } from "react-toastify";
import FeedbackForm from "../Cards/FeedbackForm";
import { FaXTwitter } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import QRcode from "../../assets/upi-qr.png"
import TopDonors from "../Cards/TopDonors";
import { useSelector } from "react-redux";
import BankDetails from "../Cards/BankDetails";
import UpiSection from "../Cards/UpiSection";

const LandingHome = ({ setView }) => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const [feedbacks, setFeedbacks] = useState([]);
  const isAdmin = currentUser?.role === "admin";
  const getAllFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:8815/feedback/all");
      if (res.data.success === false) {
        return toast.error(res.data.message);
      }
      setFeedbacks(res.data.feedbacks);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMsg);
    }
  }
  const deleteFeedback = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8815/feedback/delete/${id}`, { withCredentials: true });
      if (res.data.success === false) {
        return toast.error(res.data.message);
      }
      toast.success(res.data.message)
      getAllFeedbacks()
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getAllFeedbacks()
  }, [])
return (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <main className="grow">

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center bg-linear-to-b from-white to-red-50 px-6 text-center">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-900 leading-tight mb-6">
            Small Contributions. <br className="hidden sm:block" />
            Big Impact on Student Lives.
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-8">
            A student-led nonprofit based at RGUKT Ongole dedicated to
            providing financial assistance for health challenges,
            empowering education, and fostering community support.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <button
              onClick={() =>
                isAdmin
                  ? toast.info("Campaign creation is not allowed from the admin panel")
                  : toast.info("Please sign in to create a new campaign")
              }
              className="bg-red-900 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-red-800 transition"
            >
              Start a Campaign
            </button>

            <button
              onClick={() =>
                isAdmin
                  ? toast.info("You'll find all active campaigns in the Manage Campaigns panel")
                  : setView("campaigns")
              }
              className="border border-red-900 text-red-900 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
            >
              Explore Campaigns
            </button>

          </div>
        </div>
      </section>


      {/* TOP DONORS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <TopDonors />
        </div>
      </section>


      {/* SUPPORT SECTION */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl font-bold text-red-900 mb-10">
            Support Us Directly
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <BankDetails isAdmin={isAdmin} />
            <UpiSection isAdmin={isAdmin} />
          </div>

        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-3xl font-bold text-red-900 mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              { title: "Start a Campaign", icon: "📢" },
              { title: "Share Your Story", icon: "📖" },
              { title: "Receive Donations", icon: "💰" },
              { title: "Achieve Your Goals", icon: "🎓" },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-red-50 p-8 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold text-red-900">
                  {step.title}
                </h3>
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* WHY DONATE */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-3xl font-bold text-red-900 mb-12">
            Why Donate?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              {
                title: "Transparent Impact",
                desc: "Track every rupee and see the difference you make.",
                icon: "🔍",
              },
              {
                title: "Direct Support",
                desc: "Your donation goes straight to students in need.",
                icon: "🎯",
              },
              {
                title: "Community Growth",
                desc: "Help build a stronger and educated future.",
                icon: "🌱",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-red-100 p-8 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* IMPACT STATS */}
      <section className="py-16 px-6 bg-white text-center">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-red-900 mb-12">
            Our Impact
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            <div className="bg-red-50 p-6 rounded-xl">
              <FaUserGraduate className="text-4xl text-red-900 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-900">500+</div>
              <p className="text-gray-700">Students Helped</p>
            </div>

            <div className="bg-red-50 p-6 rounded-xl">
              <FaRupeeSign className="text-4xl text-red-900 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-900">₹10L+</div>
              <p className="text-gray-700">Funds Raised</p>
            </div>

            <div className="bg-red-50 p-6 rounded-xl">
              <FaCalendarAlt className="text-4xl text-red-900 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-900">5+</div>
              <p className="text-gray-700">Years of Service</p>
            </div>

            <div className="bg-red-50 p-6 rounded-xl">
              <FaHandsHelping className="text-4xl text-red-900 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-900">50+</div>
              <p className="text-gray-700">Events Organized</p>
            </div>

          </div>
        </div>
      </section>


      {/* TESTIMONIALS */}
      <section className="py-16 px-6 bg-gray-50 text-center">

        <h2 className="text-3xl font-bold text-red-900 mb-12">
          What People Say
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-4 max-h-96 overflow-y-auto pr-2">
            {feedbacks.map((feedback, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <p className="italic text-gray-700 mb-4">
                  “{feedback.description}”
                </p>
                <p className="font-semibold text-red-900">
                  {feedback.reviewer}
                </p>
              </div>
            ))}
          </div>

          <FeedbackForm refreshFeedbacks={getAllFeedbacks} />

        </div>
      </section>
    </main>


    {/* FOOTER */}
    <footer className="bg-red-900 text-white py-10">

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 text-center md:text-left">

        <div>
          <h4 className="font-semibold mb-2">Address</h4>
          <p>
            Santhanutalapadu, 523225 <br />
            Andhra Pradesh, India
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Phone</h4>
          <p>+91 79819 37656</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Email</h4>
          <a href="mailto:hho@rguktong.ac.in" className="hover:underline">
            hho@rguktong.ac.in
          </a>
        </div>

      </div>

      <div className="mt-8 flex justify-center space-x-6 text-xl">
        <FaFacebook className="hover:text-blue-500 cursor-pointer" />
        <FaXTwitter className="hover:text-black cursor-pointer" />
        <FaInstagram className="hover:text-pink-500 cursor-pointer" />
        <FaLinkedin className="hover:text-blue-700 cursor-pointer" />
      </div>

      <p className="mt-6 text-center text-sm">
        © {new Date().getFullYear()} Helping Hands Organization. All rights reserved.
      </p>

    </footer>
  </div>
);
};

export default LandingHome;
