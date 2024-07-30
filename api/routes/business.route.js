import express from "express";
import { createBusiness, createReviews, deleteBusiness, getAllBusiness, getBusinessbycategory,  getBusinessById,  getBusinessesByCounty,  getProductById,  getReviews,  getUniqueSelectedCounties, updateBusiness } from "../controllers/business.controller.js";
const router =express.Router();

router.post("/create", createBusiness);
router.get("/getall", getAllBusiness)

router.get("/cities", getUniqueSelectedCounties);
router.get("/city", getBusinessesByCounty);
router.get('/:id', getBusinessById);
router.get('/product/:productId', getProductById);
router.post('/reviews/create', createReviews);
router.get('/reviews/:productId', getReviews);
router.put('/update:id', updateBusiness)
router.get('/delete:id', deleteBusiness)
export default router;