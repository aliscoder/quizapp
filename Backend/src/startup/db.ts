import mongoose from "mongoose";
import { DB_URL } from "../data";

export default () => {
  mongoose.set("strictQuery", false);
  // mongoose.set("debug", true);
  mongoose
    .connect(DB_URL)
    
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
};
