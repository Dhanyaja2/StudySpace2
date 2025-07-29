import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import "dotenv/config";
import deckRoute from "./routes/deckRoute.js";
import cardRoute from "./routes/cardRoute.js";

const app = express();
const port = process.env.port || 5000;

app.use(express.json());
app.use(cors());

connectDB();

// api endpoints
app.use("/api/user", userRoute);
app.use("/api/deck", deckRoute);
app.use("/api/card", cardRoute);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
