import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";

const PORT = process.env.PORT || 8080;

console.log("Hello");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
