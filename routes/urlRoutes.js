import express from "express";
import { Router } from "express";
import shortenURL from "./incomingRequests.js";

const router = Router();

router.post("/short-url", shortenURL);

export default router;
