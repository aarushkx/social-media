import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        followers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
        following: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
        avatar: {
            type: String,
            default:
                "https://res.cloudinary.com/dzphi4kzy/image/upload/v1725940897/dgoyjxh4nfufgs3hyyme.png",
        },
        bio: { type: String, default: "" },
        link: { type: String, default: "" },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
