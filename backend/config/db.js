import mongoose, { mongo } from "mongoose";
import DB_NAME from "../constants.js";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `Database onnect on host--> ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Failed to connect to database due to ---> ", error);
  }
};

export default connectDB;
