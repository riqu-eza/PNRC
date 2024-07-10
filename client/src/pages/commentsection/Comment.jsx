/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

// import { nanoid } from "nanoid";
import { useState } from "react";
import NewComment from "./NewComment";
import Reply from "./Reply";

import { FaCross, FaEdit, FaMinus, FaPlus, FaReply } from "react-icons/fa";



export default function Comment(props ) {
  const [score, setScore] = useState(props.score);
  const [disableUpvote, setDisableUpvote] = useState(false);
  const [disableDownvote, setDisableDownvote] = useState(false);
  const isCurrentUser =  props.currentUser;
  const [backendReplies, setBackendReplies] = useState(props.replies || []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isReplying, setIsReplying] = useState(false); // Add this state
console.log(isCurrentUser)
  let starterScore = props.score;

  const isEditing =
    props.activeComment &&
    props.activeComment.id === props.id &&
    props.activeComment.type === "editing";

//  
const handleScoreChange = async (e) => {
    let newScore = score;
    if (e.target.classList.contains("minus-btn")) {
      newScore -= 1;
    } else if (e.target.classList.contains("plus-btn")) {
      newScore += 1;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/comment/${props.id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: newScore }),
      });
      const data = await res.json();
      if (data.success) {
        setScore(newScore);
        setDisableDownvote(newScore - starterScore < 1);
        setDisableUpvote(starterScore - newScore < 1);
        starterScore = newScore;
      }
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };
//   
//   
const addReply = async (text) => {
    try {
      const res = await fetch(`http://localhost:3000/api/comment/${props.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      });
      const data = await res.json();
      if (data.success) {
        setBackendReplies([data.reply, ...backendReplies]);
        props.setActiveComment(null);
      }
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };
//   



const deleteComment = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/comment/${props.id}/delete`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.success) {
      // Handle successful comment deletion, e.g., notify parent component
      props.onDelete(props.id);
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};


  return (
    <div className="comment-container">
      <div className="comment">
        <div className="comment-heading">
          <img
            className="user-avatar"
            src={props.user.avatar}
            alt="user avatar"
          />
          <p className="username">{props.user.username}</p>
          {isCurrentUser && <p className="tag">you</p>}
          <p className="date">{props.createdAt}</p>
        </div>
        <div className="editing">
          {!isEditing && <p className="comment-content">{props.content}</p>}
          {isEditing && (
            <NewComment
              currentUser={props.currentUser}
              placeholder={`Edit your comment`}
              // handleSubmit={updateComment}
              initialText={props.content}
              isEdit
              buttonText="Update"
            />
          )}
        </div>
        <div className="comment-votes">
          <button
            className="plus-btn"
            disabled={disableUpvote}
            onClick={() => handleScoreChange(1)}
          >
           
<FaPlus/>
          </button>
          <p className="comment-votes_total">{score}</p>
          <button
            disabled={disableDownvote}
            className="minus-btn"
            onClick={() => handleScoreChange(-1)}
          >
            <FaMinus/>
          </button>
        </div>
        <div className="comment-footer">
          {isCurrentUser ? (
            <div className="toggled-btns">
              <button
                className="delete-btn"
                onClick={() => setShowDeleteModal(true)}
              >
                
                <FaCross/>
                Delete
              </button>
              <button
                className="edit-btn"
                onClick={() => props.setActiveComment({ id: props.id, type: 'editing' })}
              >
                
                <FaEdit/>
                Edit
              </button>
            </div>
          ) : (
            <button
              className="reply-btn flex gap-1"
              onClick={() => setIsReplying(true)}
            >
             
              <FaReply/>
              Reply
            </button>
          )}
        </div>
      </div>
      {isReplying && (
        <div className="reply-container">
          <NewComment
            currentUser={props.currentUser}
            placeholder={`Replying to @${props.user.username}`}
            handleSubmit={(text) => addReply(`@${props.user.username}, ${text}`)}
            buttonText="Reply"
          />
        </div>
      )}
      {backendReplies.length > 0 && (
        <div className="replies-container">
          {backendReplies.map((reply) => (
            <div className="reply" key={reply.id}>
              <Reply
                currentUser={props.currentUser}
                activeComment={props.activeComment}
                setActiveComment={props.setActiveComment}
                addReply={addReply}
                deleteReply={props.deleteReply}
                updateReply={props.updateReply}
                {...reply}
              />
            </div>
          ))}
        </div>
      )}
      {showDeleteModal && (
        <div className="delete-modal-container">
          <div className="delete-modal">
            <h2 className="delete-modal_title">Delete comment</h2>
            <p className="delete-modal_content">
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone.
            </p>
            <div className="delete-modal_btns">
              <button
                className="delete-modal_btn no"
                onClick={() => setShowDeleteModal(false)}
              >
                No, cancel
              </button>
              <button
                className="delete-modal_btn yes"
                onClick={deleteComment}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}