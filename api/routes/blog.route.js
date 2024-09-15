import express from "express";

import { addview, createBlog, getAllBlogs } from "../controllers/Blog.controller.js";

const router = express.Router();

router.post("/create", createBlog);
router.get("/allblog", getAllBlogs);
router.post("/view/:_id", addview);

export default router;
