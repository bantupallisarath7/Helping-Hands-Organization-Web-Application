import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    type: String,
    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign"
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
const Document = mongoose.model("Document", documentSchema);
export default Document