import express from "express";
import { createLetter, getBroadcastById, getBroadcastHistory, getLetters, sendMessageToSubscribers, updateLetter } from "../controllers/letter.controller.js";


const router = express.Router();

router.post("/create", createLetter);
router.get("/get",getLetters);
router.put("/update", updateLetter)
router.get('/broadcasts', getBroadcastHistory);
router.get('/broadcasts/:id', getBroadcastById);
router.post('/send-message', sendMessageToSubscribers);
export default router;