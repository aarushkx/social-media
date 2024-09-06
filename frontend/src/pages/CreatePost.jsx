import React from "react";
import { Header, Create } from "../components/index.js";

function CreatePost() {
    return (
        <div className="flex justify-center">
            <Header />
            <Create />
        </div>
    );
}

export default CreatePost;
