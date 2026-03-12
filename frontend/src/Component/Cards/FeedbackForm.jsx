import axios from "axios";
import { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify";

const FeedbackForm = ({ refreshFeedbacks }) => {
    const [formData, setFormData] = useState({ description: "", reviewer: "" })
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const validation = () => {
        if (!formData.description) {
            setError("please enter feedback")
            return false
        }
        if (!formData.reviewer) {
            setError("Please enter name")
            return false
        }
        setError("")
        return true
    }

    const createFeedback = async () => {
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:8815/feedback/add",
                {
                    description: formData.description,
                    reviewer: formData.reviewer
                }, { withCredentials: true })
            if (res.data.success === false) {
                toast.error(res.data.message)
                return
            }
            toast.success(res.data.message);
            setFormData({
                description: "",
                reviewer: ""
            })
            refreshFeedbacks();
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Something went wrong";
            toast.error(errorMsg);
        } finally {
            setLoading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (validation()) {
            createFeedback();
        }
    }
    return (
        <div className="bg-red-100 p-6 rounded shadow text-left">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Leave Your Feedback</h3>
            <form className="space-y-4" onSubmit={submitHandler}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Your Feedback</label>
                    <textarea
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-red-900"
                        rows="4"
                        value={formData.description}
                        placeholder="Share your experience..."
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-red-900"
                        value={formData.reviewer}
                        placeholder="e.g., Priya, Donor"
                        onChange={(e) => setFormData({ ...formData, reviewer: e.target.value })}
                    />
                </div>
                <div>
                    <p className="text-sm mt-2 text-red-600">{error}</p>
                </div>
                <button
                    type="submit"
                    className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    )
}
export default FeedbackForm