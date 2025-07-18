import app from "./app.js";
import { connecttoDatabase } from "./db/connection.js";
import dotenv from "dotenv";
dotenv.config();


const PORT = process.env.PORT || 5002;
connecttoDatabase().then(() => {
   app.listen(PORT, () => console.log("Server Open & connected"));
})
  .catch((err) => console.log(err));