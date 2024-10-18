import express from "express";
import {  createBookingmeal, createBookingroom } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/create/room", createBookingroom);
router.post("/create/meal", createBookingmeal);
export default router;