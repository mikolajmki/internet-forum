import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    rank: { type: String, default: "Uzytkownik" },
    reputation: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    signature: { type: String },
    city: { type: String, default: "Polska" },
    isModerator: { type: Boolean, default: false },
    
    followers: [],
    following: [],

    profilePicture: String,
    coverPicture: String,
    about: String,

}, { timestamps: true });

export default mongoose.model('User', userSchema);