import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    recipient: {
        type: String,
        required: true,
        trim: true
    },
    student: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ["Health", "Education", "Supplies"],
        default: "Health"
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    deadline: {
        type: Date,
        required: true
    },
    accountHolder: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    upi: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        match: /^[6-9]\d{9}$/
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "funded"],
        default: "pending"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    collectedAmount: {
        type: Number,
        default: 0
    },
    isEmergency: {
        type: Boolean,
        default: false
    }
});

const Campaigns = mongoose.model("Campaign", campaignSchema);
export default Campaigns;