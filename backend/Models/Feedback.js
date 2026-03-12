import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    reviewer: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;