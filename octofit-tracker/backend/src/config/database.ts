import mongoose from "mongoose";

export const MONGO_DB_NAME = "octofit_db";
export const MONGO_URI = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${MONGO_DB_NAME}`;

export async function connectDatabase() {
  return mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  });
}
