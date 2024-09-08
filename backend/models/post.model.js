import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
        },
        likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
        comments: [
            {
                text: {
                    type: String,
                    required: true,
                },
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
