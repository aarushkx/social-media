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
        const imageId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imageId);
        // console.log("File DELETED SUCCESSFULLY on Cloudinary");
    } catch (error) {
        console.log("FAILED to delete file on Cloudinary: ", error);
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };
