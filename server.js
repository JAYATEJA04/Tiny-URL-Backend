import { createServer } from "node:http";
import express from "express";
import cors from "cors";

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/originalLink", (req, res) => {
  const requestBody = req.body;

  if (requestBody.keyName.toString().slice(-4) === ".com") {
    res.send("Data Received");
  } else {
    res.send("enter a valid url!");
  }
});

// app.use();
// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("HELLO MASTER!");
// });

// app.get("/", (req, res) => {
//   res.send("hello express!");
// });

app.listen(3000, () => {
  console.log("Example app listening on port: 3000");
});

// server.listen(port, hostname, () => {
//   console.log(`Server running at: http://${hostname}:${port}`);
// });
