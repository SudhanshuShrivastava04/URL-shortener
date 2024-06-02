import shortid from "shortid";
import { URL } from "../models/url.js";

export async function handleGenerateShortUrl(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortID = shortid();
  await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("home", {
    id: shortID,
  });
}

export async function handleGetUrl(req, res) {
  const shortId = req.params.shortId;
  console.log(`Received request for shortId: ${shortId}`);

  const entry = await URL.findOneAndUpdate(
    { shortID: shortId },
    {
      $push: {
        visitHistory: {
          timestamp: new Date().toLocaleDateString(),
        },
      },
    },
    { new: true }
  );

  if (!entry) {
    console.log(`No entry found for shortId: ${shortId}`);
    return res.status(404).json({ error: "Short URL not found" });
  }

  console.log(`Redirecting to URL: ${entry.redirectURL}`);
  return res.redirect(entry.redirectURL);
}

export async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortID: shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
