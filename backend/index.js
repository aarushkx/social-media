import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import { app } from "./app.js";

dotenv.config();

connectMongoDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MONGODB CONNECTION FAILED!", error);
    });
