/* eslint-disable react/prop-types */
import Comment from "./Comment";
import NewComment from "./NewComment";
import { useState } from "react";

// import data from "../data.json";

function Comments({ currentUser }) {
//   const allData = data;
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  // console.log(backendComments);

//   const createComment = async (text) => {
//     return {
//       content: text,
//       createdAt: "Just now",
//       id: nanoid(),
//       replies: [],
//       score: 1,
//       user: currentUser,
//     };
//   };

const createComment = async (text) => {
    const res = await fetch('http://localhost:3000/api/comment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text }),
    });
    const data = await res.json();
    if (data.success) {
      return data.comment;
    }
    throw new Error('Failed to create comment');
  };

//   const addComment = (text) => {
//     createComment(text).then((comment) => {
//       setBackendComments([...backendComments, comment]);
//     });
//   };
const addComment = (text) => {
    createComment(text).then((comment) => {
      setBackendComments([...backendComments, comment]);
    }).catch(error => console.error('Error adding comment:', error));
  };

//  

const deleteComment = async (commentId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/comment/${commentId}/deletecomment`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
//   const updateComment = (text, commentId) => {
//     const updatedBackendComments = backendComments.map((backendComment) => {
//       if (backendComment.id === commentId) {
//         return {...backendComment, content: text}
//       }
//       return backendComment 
//     })
//     setBackendComments(updatedBackendComments)
//     setActiveComment(null)
//   }
const updateComment = async (text, commentId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/comment/${commentId}/updatecomment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      });
      const data = await res.json();
      if (data.success) {
        const updatedBackendComments = backendComments.map((backendComment) => {
          if (backendComment.id === commentId) {
            return { ...backendComment, content: text };
          }
          return backendComment;
        });
        setBackendComments(updatedBackendComments);
        setActiveComment(null);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <main>
      {backendComments.map((comment) => (
        <Comment
          key={comment.id}
          currentUser={currentUser}
          replies={comment.replies}
          activeComment={activeComment}
          setActiveComment={setActiveComment}
          deleteComment={deleteComment}
          addComment={addComment}
          updateComment={updateComment}
          {...comment}
        />
      ))}
      <NewComment currentUser={currentUser} handleSubmit={addComment} initialText='' buttonText='send'/>
    </main>
  );
}

export default Comments;