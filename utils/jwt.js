import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  console.log("you were in jwt file.");
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

export default generateToken;
