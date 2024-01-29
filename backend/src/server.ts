import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  CORS_ORIGIN,
  JWT_COOKIE_EXPIRES_IN,
  DATABASE_URL,
} = process.env;
if (
  !ACCESS_TOKEN_SECRET ||
  !REFRESH_TOKEN_SECRET ||
  !CORS_ORIGIN ||
  !JWT_COOKIE_EXPIRES_IN ||
  !DATABASE_URL
)
  throw new Error("Enivronment variables are not set up correctly.");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
