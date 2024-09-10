import mongoose, { Schema } from "mongoose";

const verifiedSchema = new Schema({
    userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Verified = mongoose.model("Verified", verifiedSchema);

export default Verified;
