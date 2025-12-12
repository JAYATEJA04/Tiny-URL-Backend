import express from "express";
const app = express();

app.use(express.json());

app.post("/originalLink", (req, res) => {
  const requestBody = req.body;
  console.log(requestBody);
  res.send("Data Received");
});
