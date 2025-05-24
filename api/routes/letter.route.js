import express from "express";
import { createLetter, getLetters, updateLetter } from "../controllers/letter.controller.js";


const router = express.Router();

router.post("/create", createLetter);
router.get("/get",getLetters);
router.put("/update", updateLetter)
export default router;