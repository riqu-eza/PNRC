import Blog from "../models/blog.model.js";


export const createBlog = async (req, res, next) => {
    try {
      const newBlog = await Blog.create(req.body);
      return res.status(201).json(newBlog); 
    } catch (error) {
      next(error);
    }
};
 
 export const getAllBlogs = async (req, res, next) => {
  try {
    const { name } = req.query;

    // Query blogs where the category field matches the name parameter
    const blogs = await Blog.find({ category: name });

    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

