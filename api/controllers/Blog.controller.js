import Blog from "../models/blog.model.js";


export const createBlog = async (req, res, next) => {
  console.log("log",req.body )
  const { title, text, fileUrls, category, username } = req.body;

  // Ensure only one of text or fileUrls is provided
  if ((!text && !fileUrls) || (text && fileUrls)) {
    return res.status(400).json({
      error: 'You must provide either text or file URL, but not both or neither.'
    });
  }

  try {
    const blog = new Blog({ title, text, fileUrls, category, username });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error creating blog' });
  };
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

// Increment view count for a post
export const addview = async (req, res) => {
  console.log("Received request to update view count");

  try {
    const blogId = req.params._id; // Match parameter name here
    console.log(`Looking up blog with ID: ${blogId}`);

    const blog = await Blog.findById(blogId);
    if (!blog) {
      console.log(`Blog post with ID: ${blogId} not found`);
      return res.status(404).json({ message: "Blog post not found" });
    }

    console.log(`Blog post found. Current views: ${blog.views}`);

    blog.views += 1;  // Increment the view count
    await blog.save();

    console.log(`View count updated. New views: ${blog.views}`);
    res.status(200).json({ message: "View count updated" });
  } catch (error) {
    console.error("Error updating view count:", error);
    res.status(500).json({ message: "Error updating view count", error });
  }
};

