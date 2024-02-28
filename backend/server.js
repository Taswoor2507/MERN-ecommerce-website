import app from "./app.js";
import env from "dotenv";

env.config({
  path: "backend/config/.env",
});

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
