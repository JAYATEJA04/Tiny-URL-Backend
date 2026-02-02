import express from "express";
import { Router } from "express";
import { redirectToOriginalURL } from "./incomingRequests.js";
import createShortUniqueURL from "../controllers/url.controller.js";
import { registerUser, login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/registerUser", registerUser);
router.post("/login", login);
router.post("/store-short-url", createShortUniqueURL);
router.get("/:shortcode", redirectToOriginalURL);

export default router;
