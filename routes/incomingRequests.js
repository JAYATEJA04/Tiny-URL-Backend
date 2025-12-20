import express from "express";
const app = express();

const storeURLsObj = new Map();

function generateUniqueShortURL() {
  return Math.random().toString(36).substring(2, 8);
}

function storeURLs(originalURL, shortURL) {
  storeURLsObj.set(shortURL, {
    originalURL: originalURL,
  });
}

const shortenURL = async (req, res) => {
  const requestBody = req.body;

  if (requestBody.keyName.toString().slice(-4) === ".com") {
    const shortUniqueURL = generateUniqueShortURL();
    // storeURLsObj[shortUniqueURL] = requestBody.keyName;
    storeURLs(requestBody.keyName, shortUniqueURL);

    console.log("stored url object: ", storeURLsObj);

    res.send(`http://127.0.0.1:3000/${shortUniqueURL}`);
  } else {
    res.send("enter a valid url!");
  }
};

export const redirectToOriginalURL = async (req, res) => {
  const requestBody = storeURLsObj.get(req.params.shortcode);
  console.log(requestBody);

  if (!requestBody) {
    return res.status(404).send("URL not found");
  }
  console.log("original url is: ", requestBody.originalURL);

  res.redirect(requestBody.originalURL);
};

export default shortenURL;
