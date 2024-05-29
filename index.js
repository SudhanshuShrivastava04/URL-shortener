import express from "express";
import urlRouter from "./routes/url.js";
import { connectMongoDB } from "./connect.js";

const app = express();
const PORT = 8001;

connectMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Connected to MongoDB")
);

app.use(express.json());

app.use("/url", urlRouter);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
