import mongoose from "mongoose";

const donationReceiptSchema = new mongoose.Schema({
    donorName: {
        type: String,
        required: true,
        trim: true
    },
    campaignTitle: {
        type: String,
        required: true,
        trim: true
    },
    requestedStudent: {
        type: String,
        required: true,
        trim: true
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    donatedAmount: {
        type: Number,
        required: true,
        min: 1
    },
    donationDate: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdForCampaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
},
    {
        timestamps: true
    }
);

const DonationReceipt = mongoose.model("DonationReceipt", donationReceiptSchema);

export default DonationReceipt;