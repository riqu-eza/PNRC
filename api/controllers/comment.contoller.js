import Comment from '../models/comments.model.js';


export const createComment = async (req, res, next) => {
  try {
    const { content, user ,listingId} = req.body;
    console.log({ content, user, listingId });
    const newComment = {
      content,
      createdAt: new Date().toISOString(), // Use current date for creation
      user,
      listingId,
      replies: [],
      score: 1,
    };
    const comment = await Comment.create(newComment);
    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getcomment = async(req, res, next) =>{
    try {
console.log(listingId)
        const comments = await Comment.find({listingId});

        res.json(comments);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
export const getComments = async (req, res) => {
  try {
    const { listingId } = req.params;

    const comments = await Comment.find({listingId}).populate('user', 'usernane'); // Fetch comments and populate user data
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true } // Return the updated document
    );
    if (!updatedComment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    res.status(200).json({ success: true, comment: updatedComment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    res.status(200).json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all comments

