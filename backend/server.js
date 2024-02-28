import app from "./app.js";
import env from "dotenv";
import connectDB from "./config/db.js";

env.config({
  path: "backend/config/.env",
});
// db connection
try {
  connectDB().then(() => {
    console.log("Database connect successfully");
  });
} catch (error) {
  console.log("Connection failed due to error --->", error);
}
app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
