import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    phoneNumber: {
        type: String
    },
    dob: {
        type: Date
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isHHOMember: {
        type: Boolean,
        default: false
    },
    donatedAmount: {
        type: Number,
        default: 0
    },
    profilePhotoUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const User = mongoose.model('User', userSchema);
export default User;