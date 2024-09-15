import React from "react";
import { Post } from "./index.js";
import CloseIcon from "@mui/icons-material/Close";

function PostDisplayModal({ selectedPost, setSelectedPost }) {
    return (
        <dialog className="modal" open>
            <div className="modal-box bg-base-200">
                <div className="flex justify-end">
                    <button
                        onClick={() => setSelectedPost(null)}
                        className="btn btn-sm btn-circle btn-ghost"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <Post post={selectedPost} />
            </div>

            <form method="dialog" className="modal-backdrop">
                <button>Close</button>
            </form>
        </dialog>
    );
}

export default PostDisplayModal;
