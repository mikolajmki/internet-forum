import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: { type: String, required: true, maxlength: 24, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    rank: { type: String, default: "Uzytkownik" },
    reputation: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    signature: { type: String, maxLength: 64 },
    city: { type: String, default: "Polska" },
    isModerator: { type: Boolean, default: false },
    about: { type: String, required: false, maxLength: 200 },
    profilePicture: { type: String, required: false },
    coverPicture: { type: String, required: false },
    
    followers: [],
    following: [],


}, { timestamps: true });

export default mongoose.model('User', userSchema);