import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        // console.log("File UPLOADED SUCCESSFULLY on Cloudinary", response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
};

const deleteFromCloudinary = async (imageUrl) => {
    try {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        const result = await cloudinary.uploader.destroy(publicId);
        return result.result === "ok";
    } catch (error) {
        console.error("FAILED to delete file on Cloudinary: ", error);
        return false;
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };
