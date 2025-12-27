import express from "express";
const app = express();
import Url from "../schema/dataSchema.js";
import mongoose from "mongoose";

const storeURLsObj = new Map();

function generateUniqueShortURL() {
  return Math.random().toString(36).substring(2, 8);
}

function normaliseURL(url) {
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    return "http://" + url;
  }
  return url;
}

function storeURLs(originalURL, shortURL, timestamp) {
  // const originalLink = "https://" + originalURL;
  const originalLink = normaliseURL(originalURL);
  // console.log("type of store URLs object is: ", typeof storeURLsObj);
  const originalURLalreadyExists = Array.from(storeURLsObj.values()).some(
    (entry) => entry.originalLink === originalLink
  );

  if (!originalURLalreadyExists) {
    storeURLsObj.set(shortURL, {
      originalLink: originalLink,
      timestamp: timestamp,
    });
    return `http://127.0.0.1:3000/${shortURL}`;
  }

  return "URL is already stored.";
}

const shortenURL = async (req, res) => {
  try {
    const requestBody = req.body;

    const generatedShortURL = generateUniqueShortURL();

    // console.log(
    //   `request body is: `,
    //   requestBody,
    //   ` & short unique url is: ${generatedShortURL}`
    // );

    const checkIfURLExists = await Url.findOne({
      originalURL: requestBody.keyName,
    });
    // console.log("check if url exists: ", checkIfURLExists);
    if (checkIfURLExists) {
      return res.send(
        `URL already exists and the URL is: http://127.0.0.1:3000/${checkIfURLExists.shortURL}`
      );
    } else {
      const newEntryToDatabase = await Url.create({
        shortURL: generatedShortURL,
        originalURL: requestBody.keyName,
      });

      console.log(`the new entry is: ${newEntryToDatabase}`);
      return res.send(`http://127.0.0.1:3000/${newEntryToDatabase.shortURL}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const redirectToOriginalURL = async (req, res) => {
  const { shortcode } = req.params;

  const searchedEntry = await Url.findOne({ shortURL: shortcode });

  if (!searchedEntry) {
    return res.send("error in finding the link");
  }
  console.log("the searched entry in redirect is: ", searchedEntry);
  res.redirect(searchedEntry.originalURL);
};

export default shortenURL;
