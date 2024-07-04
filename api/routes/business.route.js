import express from "express";
import { createBusiness, getBusinessbycategory,  getBusinessById,  getBusinessesByCounty,  getProductById,  getUniqueSelectedCounties } from "../controllers/business.controller.js";
const router =express.Router();

router.post("/create", createBusiness);
router.get("/cities", getUniqueSelectedCounties);
router.get("/city", getBusinessesByCounty);
router.get('/:id', getBusinessById);
router.get('/product/:productId', getProductById);
export default router;