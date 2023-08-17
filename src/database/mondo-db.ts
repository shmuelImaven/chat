import mongoose from 'mongoose';
import { config } from '../config';
import logger from '../logger';

const MONGO_URI = "mongodb+srv://imaven:<password>@cluster0.3orbh2x.mongodb.net/myDatabaseName";

export class Database {
    public static async connect(): Promise<void> {
        try {
            logger.info(config.mongo_uri);
            logger.info(process.env.MONGO_URI);
            await mongoose.connect(config.mongo_uri);
            console.log("Connected to MongoDB!");
        } catch (error) {
            console.error("Error connecting to database: ", error);
            throw error;
        }
    }

    public static async close(): Promise<void> {
        try {
            await mongoose.connection.close();
            console.log("MongoDB connection closed.");
        } catch (error) {
            console.error("Error closing the database: ", error);
            throw error;
        }
    }
}