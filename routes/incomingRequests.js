import Url from "../schema/dataSchema.js";
import redisClient from "../redisClient.js";

function generateUniqueShortURL() {
  return Math.random().toString(36).substring(2, 8);
}

function normaliseURL(url) {
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    return "http://" + url;
  }
  return url;
}

const storeURLInDatabase = async (originalURL, generatedShortURL) => {
  const originalLink = normaliseURL(originalURL);

  try {
    const checkIfURLExists = await Url.findOne({
      originalURL: originalLink,
    });

    if (checkIfURLExists) {
      return `URL already exists and the URL is: http://127.0.0.1:3000/${checkIfURLExists.shortURL}`;
    } else {
      const newEntryToDatabase = await Url.create({
        shortURL: generatedShortURL,
        originalURL: originalLink,
      });

      return `http://127.0.0.1:3000/${newEntryToDatabase.shortURL}`;
    }
  } catch (error) {
    return `Error: ${error}`;
  }
};

const shortenURL = async (req, res) => {
  try {
    const requestBody = req.body;

    const generatedShortURL = generateUniqueShortURL();

    const newEntryToDatabase = await storeURLInDatabase(
      requestBody.keyName,
      generatedShortURL
    );

    return res.send(newEntryToDatabase);
  } catch (error) {
    console.log(error);
  }
};

export const redirectToOriginalURL = async (req, res) => {
  const { shortcode } = req.params;

  const cachedURL = await redisClient.get(shortcode);
  if (cachedURL) {
    console.log("Cache HIT!");
    return res.redirect(cachedURL);
  }

  console.log("Cache MISS.");

  const searchedEntry = await Url.findOne({ shortURL: shortcode });

  if (!searchedEntry) {
    return res.send("error in finding the link");
  }

  //redis set
  await redisClient.set(shortcode, searchedEntry.originalURL, {
    EX: 60 * 60,
  });

  console.log("the searched entry in redirect is: ", searchedEntry);
  res.redirect(302, searchedEntry.originalURL);
};

export default shortenURL;
