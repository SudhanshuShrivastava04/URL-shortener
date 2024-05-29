import express from "express";
import {
  handleGenerateShortUrl,
  handleGetAnalytics,
  handleGetUrl,
} from "../controllers/url.js";

const router = express.Router();

router.post("/", handleGenerateShortUrl);

router.get("/:shortId", handleGetUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

export default router;
