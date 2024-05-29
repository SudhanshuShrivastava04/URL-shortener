import mongoose from "mongoose";

const URLschema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timeStamps: { type: Number } }],
  },
  { timestamps: true }
);

export const URL = mongoose.model("url", URLschema);
