import express from "express";
const app = express();

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
  const requestBody = req.body;

  // if (requestBody.keyName.toString().slice(-4) === ".com") {
  if (requestBody.keyName.toString()) {
    const shortUniqueURL = generateUniqueShortURL();
    console.log(typeof requestBody.keyName);

    const confirmationStatus = storeURLs(
      requestBody.keyName.toLowerCase(),
      shortUniqueURL,
      requestBody.timestamp
    );
    console.log("stored url object: ", storeURLsObj);
    res.send(confirmationStatus);
  } else {
    res.send("enter a valid url!");
  }
};

export const redirectToOriginalURL = async (req, res) => {
  const requestBody = storeURLsObj.get(req.params.shortcode);

  if (!requestBody) {
    return res.status(404).send("URL not found");
  }

  res.redirect(requestBody.originalLink);
};

export default shortenURL;
