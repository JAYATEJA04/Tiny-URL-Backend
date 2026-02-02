import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortURL: {
    type: "string",
    unique: true,
  },
  originalURL: {
    type: "string",
  },
});

export default mongoose.model("Url", urlSchema);
