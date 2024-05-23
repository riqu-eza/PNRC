import Comment from '../models/comments.model.js';


export const createComment = async(req, res, next) =>{
    try {
      const newComment = req.body;
      console.log(newComment)
        const comment = await Comment.create(newComment);
        res.status(201).json(comment);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}


export const getcomment = async(req, res, next) =>{
    try {
        const comments = await Comment.find();
        res.json(comments);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}