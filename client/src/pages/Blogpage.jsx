import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import("./page.css");

const BlogPage = () => {
  const { name } = useParams();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 11;

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
        const response = await fetch(`http://localhost:3000/api/blog/allblog?name=${encodeURIComponent(name)}`);
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

  // Calculate the posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-2 blog  ">
        {currentPosts.map((post) => (
          <div key={post.id} className="border p-4 bg-blue-100 m-6 rounded-lg ">
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

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`mx-1 px-3 py-1 border rounded ${currentPage === number ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
            >
              {number}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default BlogPage;
