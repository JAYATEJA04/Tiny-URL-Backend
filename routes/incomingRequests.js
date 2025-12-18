import express from "express";
const app = express();

const storeURLsObj = {};

function generateUniqueShortURL() {
  return Math.random().toString(36).substring(2, 8);
}

const shortenURL = async (req, res) => {
  const requestBody = req.body;

  if (requestBody.keyName.toString().slice(-4) === ".com") {
    const shortUniqueURL = generateUniqueShortURL();
    storeURLsObj[shortUniqueURL] = requestBody.keyName;

    console.log("stored url object: ", storeURLsObj);

    res.send(`http://127.0.0.1:3000/${shortUniqueURL}`);
  } else {
    res.send("enter a valid url!");
  }
};

export default shortenURL;
