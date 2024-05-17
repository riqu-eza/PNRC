import express from "express";
import { createComment, getcomment } from "../controllers/comment.contoller.js";

const router = express.Router();


router.post("/create", createComment);
router.get("/getcomment", getcomment);

export default router;
