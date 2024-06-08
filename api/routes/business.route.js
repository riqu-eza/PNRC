import express from "express";
import { createBusiness } from "../controllers/business.controller.js";
const router =express.Router();

router.post("/create", createBusiness)

export default router;