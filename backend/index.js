import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import { app } from "./app.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config({
    path: "./.env",
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectMongoDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MONGODB CONNECTION FAILED!", error);
    });
