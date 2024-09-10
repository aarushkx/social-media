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
        // console.log("File UPLOADED successfully on Cloudinary", response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
};

const deleteOnCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
        // console.log("File DELETED successfully on Cloudinary");
    } catch (error) {
        console.log("FAILED to delete file on Cloudinary: ", error);
    }
};

export { uploadOnCloudinary, deleteOnCloudinary };
