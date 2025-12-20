import express from "express";
import { Router } from "express";
import shortenURL, { redirectToOriginalURL } from "./incomingRequests.js";

const router = Router();

router.post("/store-short-url", shortenURL);
router.get("/:shortcode", redirectToOriginalURL);

export default router;
