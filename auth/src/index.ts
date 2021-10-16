import mongoose from "mongoose";
import { app } from './app'

const start = async () => {
    // check make sure find env
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
        console.log("Connected db");
    } catch (error) {
        console.error(error);
    }
    app.listen(3000, () => {
        // console.log("t");
        console.log("Listenting on port 3000!!");
    });
};

start();
