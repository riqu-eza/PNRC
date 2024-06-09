import express from "express";
import { createBusiness, getBusinessbycategory, getUniqueSelectedCounties } from "../controllers/business.controller.js";
const router =express.Router();

router.post("/create", createBusiness)
router.get("/cities", getUniqueSelectedCounties)
router.get("/city", getBusinessbycategory)
export default router;