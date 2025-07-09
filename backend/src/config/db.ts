import mongoose from "mongoose"
import { MONGO_URL } from "../constants/env";

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log(`Successfully connected to db`);
    } catch (error) {
        console.log(`Could not connect the database`, error);
        process.exit(1);
    }
}