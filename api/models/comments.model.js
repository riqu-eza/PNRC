import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    replies: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment', 
    }],
    score: {
      type: Number,
      default: 1,
    },
    listingId:{
      type: String,
      required: true,
    }
  },

{ timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
