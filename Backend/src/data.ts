export const SITE =
  process.env.NODE_ENV === "production"
    ? "https://quiz.iran.liara.run"
    // : "http://192.168.1.149:3000";
    : "http://192.168.1.35:3000";
export const PRIVATE_KEY = "shaludama";
export const PORT = 3000;
export const DB_URL =
  process.env.NODE_ENV === "production"
    ? "mongodb://root:xowvKnOYxlO8W1SCY5S2sHra@robin.iran.liara.ir:32565/my-app?authSource=admin"
    : "mongodb://127.0.0.1:27017/quiz";
