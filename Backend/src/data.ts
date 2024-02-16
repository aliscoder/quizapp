export const SITE =
  process.env.NODE_ENV === "production"
    ? "https://quiz.iran.liara.run"
    : "http://192.168.1.149:3000";
    // : "http://192.168.1.22:3000";
export const PRIVATE_KEY = "shaludama";
export const PORT = 3000;
export const DB_URL =
  process.env.NODE_ENV === "production"
    ? "mongodb://root:K2gR22c2UHX5LwajoPYeJyl2@finn.iran.liara.ir:30960/my-app?authSource=admin"
    : "mongodb://127.0.0.1:27017/quiz";
