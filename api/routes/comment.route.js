import express from "express";
import { createComment, getcomment } from "../controllers/comment.contoller.js";

const router = express.Router();


router.post("/create", createComment);
router.get("/getcomment", getcomment);
router.post("/:id/vote", )
router.post("/:id/reply")
router.delete("/:replyid")
router.put("reply/:replyid")
router.put("/:commentId/updatecomment")
router.delete("/:commentId/deletecomment")



export default router;
