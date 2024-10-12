import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
  getUniqueSelectedCounties,
  getListingsByCounty,
  getAllListings,
  getCategories
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create",  createListing);
router.delete("/delete/:id", deleteListing);
router.put("/update/:id",  updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);
router.get("/getall", getAllListings );
router.get("/unique-counties", getUniqueSelectedCounties);
router.get("/get-by-county", getListingsByCounty)
router.get('/:county/:categoryname', getCategories);


export default router;
