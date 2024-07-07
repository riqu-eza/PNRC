import express from "express";
import { createBusiness, createReviews, getBusinessbycategory,  getBusinessById,  getBusinessesByCounty,  getProductById,  getReviews,  getUniqueSelectedCounties } from "../controllers/business.controller.js";
const router =express.Router();

router.post("/create", createBusiness);
router.get("/cities", getUniqueSelectedCounties);
router.get("/city", getBusinessesByCounty);
router.get('/:id', getBusinessById);
router.get('/product/:productId', getProductById);
router.post('/reviews/create', createReviews);
router.get('/reviews/:productId', getReviews)
export default router;