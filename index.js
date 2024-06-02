import express from "express";
import urlRouter from "./routes/url.js";
import staticRouter from "./routes/static.js";
import { connectMongoDB } from "./connect.js";
import path from "path";
import { URL } from "./models/url.js";

const app = express();
const PORT = 8001;

connectMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Connected to MongoDB")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRouter);
app.use("/", staticRouter);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
