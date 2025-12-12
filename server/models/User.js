import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please provide a valid email address"]
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;