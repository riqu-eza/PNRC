import express from "express";

import { createBlog, getAllBlogs } from "../controllers/Blog.controller.js";

const router = express.Router();

router.post("/create", createBlog);
router.get("/allblog", getAllBlogs);

export default router;
