import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const URI = process.env.MONGODBURL;
export const connection=async()=>{
    try {
        await mongoose.connect(URI);
        console.log("MongoDB connection established..!!");
    } catch (error) {
        console.log("Error While Connecting..!!"+error.message);
    }
}