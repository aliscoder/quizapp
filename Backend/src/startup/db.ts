import mongoose from "mongoose";

export default () => {
  mongoose.set("strictQuery", false);
  // mongoose.set("debug", true);
  mongoose
    .connect(
      // "mongodb://root:K2gR22c2UHX5LwajoPYeJyl2@finn.iran.liara.ir:30960/my-app?authSource=admin"
      "mongodb://127.0.0.1:27017/quiz"
    )
    
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
};