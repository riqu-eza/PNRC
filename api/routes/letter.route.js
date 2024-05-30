import express from "express";
import { createletter } from "../controllers/letter.controller.js";


const router = express.Router();

router.post("/create", createletter);

export default router;