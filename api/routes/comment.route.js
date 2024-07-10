import express from "express";
import { createComment, deleteComment, getcomment, getComments, updateComment } from "../controllers/comment.contoller.js";

const router = express.Router();


router.post("/create", createComment);
router.get("/getComments/:listingId", getComments);
router.post("/:id/vote", )
router.post("/:id/reply", )
router.delete("/:replyid")
router.put("reply/:replyid")
router.put("/:commentId/updatecomment", updateComment)
router.delete("/:.id/delete", deleteComment)



export default router;
