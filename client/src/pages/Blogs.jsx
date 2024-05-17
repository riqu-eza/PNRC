import React, { useState, useEffect } from "react";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blog/allblog");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        setBlogPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {blogPosts.map((post) => (
        <div key={post.id} className="border p-4">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="mt-2">
            {post.text.split(" ").slice(0, 10).join(" ")}
            {post.text.split(" ").length > 10 ? "..." : ""}
            <button
              className="text-blue-500 hover:underline ml-2"
              onClick={() => openModal(post)}
            >
              Read more
            </button>
          </p>
        </div>
      ))}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg max-w-lg overflow-y-auto border border-gray-300 m-4 mt-10 max-h-screen">
            <h2 className="text-lg font-semibold">{selectedPost.title}</h2>
            <p className="mt-2">{selectedPost.text}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
