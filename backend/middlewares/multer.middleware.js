import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "backend/temp/uploads");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname +
                "-" +
                Date.now() +
                "-" +
                Math.round(Math.random() * 1e9)
        );
    },
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB size limit
});
