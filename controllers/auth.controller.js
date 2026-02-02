import bcrypt from "bcryptjs";
import generateToken from "../utils/jwt.js";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("req.body is: ", req.body);
  console.log("email is: ", email);

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  const token = generateToken(user._id);
  console.log("token: ", token);

  res.status(201).json({ token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid requests" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user._id);
  res.json({ token });
};
