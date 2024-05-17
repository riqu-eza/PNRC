import express from "express";

import {
  createCountyimg,
  countyimage, 
  createCity,
  getAllCities
  
 
  
} from "../controllers/admin.controller.js";


const router = express.Router();


router.post("/create", createCountyimg);
router.get("/bckimg", countyimage)
router.post("/city", createCity)
router.get("/cities", getAllCities)

export default router;