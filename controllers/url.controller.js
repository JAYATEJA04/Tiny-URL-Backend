import encodeBase62 from "../base62.js";
import Url from "../schema/dataSchema.js";
import getNextSequence from "../getNextSequence.js";

function normaliseURL(url) {
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    return "http://" + url;
  }
  return url;
}

const createShortUniqueURL = async (req, res) => {
  const incomingURL = req.body;

  const originalLink = normaliseURL(incomingURL.keyName);

  const existing = await Url.findOne({ originalURL: originalLink });
  if (existing) {
    return res.send(
      `URL already exists and the URL is: http://127.0.0.1:3000/${existing.shortURL}`
    );
  }

  const id = await getNextSequence("url_counter");
  const shortUniqueURL = encodeBase62(id);

  const url = await Url.create({
    shortURL: shortUniqueURL,
    originalURL: originalLink,
  });

  console.log("new short url is: ", url.shortURL);

  res.json(`http://127.0.0.1:3000/${url.shortURL}`);
};

export default createShortUniqueURL;
