import Url from "../schema/dataSchema.js";
import redisClient from "../redisClient.js";

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
