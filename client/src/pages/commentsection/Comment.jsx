/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

// import { nanoid } from "nanoid";
import { useState } from "react";
import NewComment from "./NewComment";
import Reply from "./Reply";
// import deleteIcon from '../images/icon-delete.svg'
// import editIcon from '../images/icon-edit.svg'
// import minusIcon from '../images/icon-minus.svg'
// import plusIcon from '../images/icon-plus.svg'
// import replyIcon from '../images/icon-reply.svg'
import { useSelector } from "react-redux";



export default function Comment(props) {
  const [score, setScore] = useState(props.score);
  const [disableUpvote, setDisableUpvote] = useState(false);
  const [disableDownvote, setDisableDownvote] = useState(false);
  const { isCurrentUser } = useSelector((state) => state.user);

  const [backendReplies, setBackendReplies] = useState(props.replies);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  let starterScore = props.score;
//   const isCurrentUser = props.user.username === props.currentUser.username;
  const isReplying =
    props.activeComment &&
    props.activeComment.id === props.id &&
    props.activeComment.type === "replying";
  const isEditing =
    props.activeComment &&
    props.activeComment.id === props.id &&
    props.activeComment.type === "editing";

//   const handleScoreChange = (e) => {
//     if (e.target.classList.contains("minus-btn")) {
//       setScore((prevScore) => prevScore - 1);
//       if (score - starterScore < 1) {
//         setDisableDownvote(true);
//         setDisableUpvote(false);
//         starterScore = props.score;
//       }
//     }
//     if (e.target.classList.contains("plus-btn")) {
//       setScore((prevScore) => prevScore + 1);
//       if (starterScore - score < 1) {
//         setDisableUpvote(true);
//         setDisableDownvote(false);
//         starterScore = props.score;
//       }
//     }
//   };
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
//   const createReply = async (text) => {
//     return {
//       content: text,
//       createdAt: "Just now",
//       id: nanoid(),
//       replyingTo: props.user.username,
//       score: 1,
//       user: props.currentUser,
//     };
//   };

//   const addReply = (text) => {
//     createReply(text).then((reply) => {
//       setBackendReplies([reply, ...backendReplies]);
//     });
//     props.setActiveComment(null);
//   };
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
//   const deleteReply = (replyId) => {
//     for (let i = 0; i < backendReplies.length; i++) {
//       const updatedBackendReplies = backendReplies.filter(
//         (backendReply) => backendReply.id !== replyId
//       );
//       setBackendReplies(updatedBackendReplies);
//     }
//   };

const deleteReply = async (replyId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/comment/reply/${replyId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        const updatedBackendReplies = backendReplies.filter((backendReply) => backendReply.id !== replyId);
        setBackendReplies(updatedBackendReplies);
      }
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
}
//   const updateReply = (text, replyId) => {
//     const updatedBackendReplies= backendReplies.map((backendReply) => {
//       if (backendReply.id === replyId) {
//         return {...backendReply, content: text}
//       }
//       return backendReply
//     })
//     setBackendReplies(updatedBackendReplies)
//     props.setActiveComment(null)
//   }
const updateReply = async (text, replyId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/comment/reply/${replyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      });
      const data = await res.json();
      if (data.success) {
        const updatedBackendReplies = backendReplies.map((backendReply) => {
          if (backendReply.id === replyId) {
            return { ...backendReply, content: text };
          }
          return backendReply;
        });
        setBackendReplies(updatedBackendReplies);
        props.setActiveComment(null);
      }
    } catch (error) {
      console.error('Error updating reply:', error);
    }
  };
  return (
    <div className="comment-container">
      <div className="comment">
        <div className="comment-heading">
          <img
            className="user-avatar"
            src={props.user.image.png}
            alt="user avatar"
          />
          <p className="username">{props.user.username}</p>
          {props.user.username === props.currentUser.username && (
            <p className="tag">you</p>
          )}
          <p className="date">{props.createdAt}</p>
        </div>
        <div className="editing">
          {!isEditing && <p className="comment-content">{props.content}</p>}
          {isEditing && (
            <NewComment
              currentUser={props.currentUser}
              handleSubmit={(text) => {
                props.updateComment(text, props.id);
              }}
              initialText={props.content}
              isEdit
              buttonText='update'
            />
          )}
        </div>
        <div className="comment-votes">
          <button
            className='plus-btn'
            disabled={disableUpvote}
            onClick={handleScoreChange}
          >
            <img
              className={`plus-btn plus-icon`}
              src={plusIcon}
              alt="plus icon"
            />
          </button>
          <p className="comment-votes_total">{score}</p>
          <button
            disabled={disableDownvote}
            className='minus-btn'
            onClick={handleScoreChange}
          >
            <img
              className={`minus-btn minus-icon`}
              src={minusIcon}
              alt="minus icon"
            />
          </button>
        </div>
        <div className="comment-footer">
          {isCurrentUser ? (
            <div className="toggled-btns">
              <button
                className="delete-btn"
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              >
                <img
                  className="delete-icon"
                  src={deleteIcon}
                  alt="delete icon"
                />
                Delete
              </button>
              <button
                className="edit-btn"
                onClick={() => {
                  props.setActiveComment({ id: props.id, type: "editing" });
                }}
              >
                <img
                  className="edit-icon"
                  src={editIcon}
                  alt="edit icon"
                />
                Edit
              </button>
            </div>
          ) : (
            <button
              className="reply-btn"
              onClick={() =>
                props.setActiveComment({ id: props.id, type: "replying" })
              }
            >
              <img
                className="reply-icon"
                src={replyIcon}
                alt="reply icon"
              />
              Reply
            </button>
          )}
        </div>
      </div>
      {isReplying && (
        <div>
          <NewComment
            currentUser={props.currentUser}
            placeholder={`Replying to @${props.user.username}`}
            handleSubmit={(text) =>
              addReply(`@${props.user.username}, ${text}`)
            }
            buttonText='reply'
          />
        </div>
      )}
      {props.replies && (
        <div className="replies-container">
          {backendReplies.map((reply) => (
            <div className="reply" key={reply.id}>
              <Reply
                
                currentUser={props.currentUser}
                activeComment={props.activeComment}
                setActiveComment={props.setActiveComment}
                addReply={addReply}
                deleteReply={deleteReply}
                updateReply={updateReply}
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
                onClick={() => {
                  setShowDeleteModal(false);
                }}
              >
                No, cancel
              </button>
              <button
                className="delete-modal_btn yes"
                onClick={() => {
                  props.deleteComment(props.id);
                }}
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