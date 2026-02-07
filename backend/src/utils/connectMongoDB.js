import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongo Connected at ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDb Error : ", error);
  }
};
