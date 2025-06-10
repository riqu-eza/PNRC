import express from "express";
import {   createBookingroom, getroom } from "../controllers/roombooking.controller.js";
import { createBookingmeal, getmeal } from "../controllers/mealBooking.controller.js";
import { createBookingEntertainment } from "../controllers/entertainment.controller.js";

const router = express.Router();

router.post("/create/room", createBookingroom);
router.post("/create/meal", createBookingmeal);
router.get(`/getroom/:id`,getroom );
router.get(`/getmeal/:id`,getmeal );
router.post("/create/entertainment", createBookingEntertainment);
router.get(`/getentertainment/:id`,getroom );

export default router;