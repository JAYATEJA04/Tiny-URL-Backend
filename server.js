import { createServer } from "node:http";
import express from "express";
import { Router } from "express";
import cors from "cors";
import router from "./routes/urlRoutes.js";
import Url from "./models/dataModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.use(cors());
app.use(express.json());
const storeURLsObj = {};

// function generateUniqueShortURL() {
//   return Math.random().toString(36).substring(2, 8);
// }

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to database"))
  .catch((error) => console.error("Connection error: ", error));

app.use(router);
// app.get("/:shortCode", async (req, res) => {
//   const url = await Url.findOne({ shortCode: req.params.shortCode });

//   if (!url) {
//     return res.status(404).send("data not found");
//   }

//   res.redirect(302, url.originalLink);
// });

// app.post("/short-url", (req, res) => {
//   const requestBody = req.body;

//   if (requestBody.keyName.toString().slice(-4) === ".com") {
//     const shortUniqueURL = generateUniqueShortURL();
//     // storeURLsObj.shortURL = shortUniqueURL;
//     // storeURLsObj.orignalUrl = requestBody.keyName;
//     // storeURLsObj["shortURL"] = shortUniqueURL;
//     // storeURLsObj["originalURL"] = requestBody.keyName;

//     storeURLsObj[shortUniqueURL] = requestBody.keyName;

//     console.log("store url object: ", storeURLsObj);

//     res.send(`https://127.0.0.1:3000/${shortUniqueURL}`);
//   } else {
//     res.send("enter a valid url!");
//   }
// });

app.listen(3000, () => {
  console.log("Example app listening on port: 3000");
});
