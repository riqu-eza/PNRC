import mongoose, { trusted } from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
   
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    category:{
     type:String,
     required:true,
    },
    fileUrls:{
      type: [],
      required:false,
    },
    views: { type: Number, default: 0 },
    username: {
      type: String,
      required:true
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
