import { useState } from "react";
import { useUser } from "../components/Adminuser";

const Bloglisting = () => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "",
    file: null, // Add file to state
  });

  const categories = ["Travel", "Business", "Culture"];
  const { username } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const datatosend = new FormData(); // Use FormData for file upload
      datatosend.append("title", formData.title);
      datatosend.append("text", formData.text);
      datatosend.append("category", formData.category);
      datatosend.append("username", username);
      if (formData.file) {
        datatosend.append("file", formData.file); // Add the file to the form data
      }

      const response = await fetch("http://localhost:3000/api/blog/create", {
        method: "POST",
        body: datatosend, // Send form data including the file
      });

      const data = await response.json();
      console.log("Post created:", data);
      setFormData({ title: "", text: "", category: "", file: null }); // Reset the form
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFormData({
        ...formData,
        file: files[0], // Store the selected file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="container mx-auto p-6 relative bg-customimage bg-cover bg-center">
      <h1 className="text-3xl font-semibold mb-6">Add Blog</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            Text:
          </label>
          <textarea
            name="text"
            id="text"
            value={formData.text}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            rows="5"
          />
        </div>

        {/* File Upload Field */}
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
            Upload PDF:
          </label>
          <input
            type="file"
            name="file"
            id="file"
            accept="application/pdf" // Limit file types to PDF
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Bloglisting;
