import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`Successfully connected to MongoDB: ${conn.connection.host} `);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error connecting to MongoDB: ${error.message} `);
    } else {
      console.error(
        "An unknown error occurred while connecting to the database.",
      );
    }
    process.exit(1);
  }
};

export default connectDB;
