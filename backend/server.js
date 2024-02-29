import app from "./app.js";
import env from "dotenv";
import connectDB from "./config/db.js";

env.config({
  path: "backend/config/.env",
});

// handle uncaugth excception error
process.on("uncaughtException", (err) => {
  console.log(`Error --> ${err.message}`);
  console.log("Server stop due to excception error");
  process.exit(1);
});

// db connection
// try {
//   connectDB().then(() => {
//     console.log("Database connect successfully");
//   });
// } catch (error) {
//   console.log("Connection failed due to error --->", error);
// }
// connectDB();

connectDB().then(() => {
  console.log("Server connected successfully");
});

const server = app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});

// unhandeled promise rejection
process.on("unhandledRejection", (err) => {
  console.log("Error-->", err.message);
  server.close(() => {
    console.log("Server stop due to unhandeled promise rejection");
    process.exit(1);
  });
});

// console.log(youtube);
