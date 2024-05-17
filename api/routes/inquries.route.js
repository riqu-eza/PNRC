import express from "express";
import { createInquiry } from "../controllers/inquries.controller.js";

const router = express.Router();

router.post("/create", createInquiry);

export default router;
