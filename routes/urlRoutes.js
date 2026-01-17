import express from "express";
import { Router } from "express";
import shortenURL, { redirectToOriginalURL } from "./incomingRequests.js";
import createShortUniqueURL from "../controllers/url.controller.js";

const router = Router();

router.post("/store-short-url", createShortUniqueURL);
router.get("/:shortcode", redirectToOriginalURL);

export default router;
