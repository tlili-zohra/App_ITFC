import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/adminlogin/dashbordadmin/blogmanager";

const Blogsmanger = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", author: "" });
  const [cover, setCover] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState(""); // <-- Add search state

  // Filter blogs based on search
  const filteredBlogs = blogs.filter((blog) => {
    const searchLower = search.toLowerCase();
    return (
      blog.title?.toLowerCase().includes(searchLower) ||
      blog.content?.toLowerCase().includes(searchLower) ||
      blog.author?.toLowerCase().includes(searchLower) ||
      (blog.createdAt && blog.createdAt.toLowerCase().includes(searchLower))
    );
  });
  // Centralized fetch function
  const getBlogs = () => {
    fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("admin"))?.token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs || []));
  };

  // Fetch blogs on mount
  useEffect(() => {
    getBlogs();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle cover image change
  const handleCoverChange = (e) => {
    setCover(e.target.files[0]);
  };
  // Handle multiple images change
  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files));
  };
  // State for existing images and cover
  const [existingImages, setExistingImages] = useState([]);
  const [existingCover, setExistingCover] = useState(null);

  // Add or update blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("author", form.author);
    formData.append("date", form.date); // <-- Add this line!
    if (cover) formData.append("cover", cover);
    images.forEach((img) => formData.append("images", img));

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("admin"))?.token
        }`,
      },
      body: formData,
    });
    if (res.ok) {
      getBlogs(); // Refresh list after add/update
      setForm({ title: "", content: "", author: "" });
      setCover(null);
      setEditingId(null);
      setImages([]);
    }
    if (editingId) {
      formData.append("existingImages", JSON.stringify(existingImages));
      formData.append("existingCover", existingCover || "");
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      date: blog.createdAt
        ? new Date(blog.createdAt).toISOString().split("T")[0]
        : "",
    });
    setEditingId(blog._id);
    setCover(null);
    setImages([]);
    setExistingImages(blog.images || []); // <-- Add this line
    setExistingCover(blog.coverImage || null); // <-- Add this line
    getBlogs();
  };

  // Remove an existing image
  const handleRemoveImage = (img) => {
    setExistingImages(existingImages.filter((i) => i !== img));
  };

  // Remove existing cover
  const handleRemoveCover = () => {
    setExistingCover(null);
  };

  // Remove blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("admin"))?.token
        }`,
      },
    });
    if (res.ok) getBlogs(); // Refresh list after delete
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4 text-white">Blog Manager</h1>
      <div className="bg-white/80 rounded-xl shadow-md p-6 mb-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Content"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author"
            className="w-full p-2 border rounded"
            required
          />
          {/* Date input */}
          <label className="block font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={form.date || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <label className="block font-semibold">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="w-full p-2 border rounded"
          />
          <label className="block font-semibold">Other Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-yellow-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update Blog" : "Add Blog"}
          </button>

          {/*  {editingId && (<button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ title: "", content: "", author: "", date: "" });
                setCover(null);
                setImages([]);
              }}
              className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>*/}
          {editingId && (
            <>
              {/* Show current cover image (no remove button) */}
              {cover && (
                <div className="mb-2">
                  <span className="block text-xs text-gray-500">
                    New Cover Preview:
                  </span>
                  <img
                    src={URL.createObjectURL(cover)}
                    alt="New Cover Preview"
                    className="w-32 h-20 object-cover rounded"
                  />
                </div>
              )}
              {/* Show current other images (no remove button) */}
              {images.length > 0 && (
                <div className="mb-2">
                  <span className="block text-xs text-gray-500">
                    New Images Preview:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {images.map((img, idx) => (
                      <img
                        key={idx}
                        src={URL.createObjectURL(img)}
                        alt={`New image ${idx + 1}`}
                        className="w-20 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </form>
      </div>
      <div className="bg-white/80 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-2">All Blogs</h2>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by title, content, author, or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <ul>
          {filteredBlogs.map((blog) => (
            <li key={blog._id} className="mb-4 border-b pb-2">
              <div className="font-semibold">{blog.title}</div>
              <div className="text-sm text-gray-700">{blog.content}</div>
              <div className="text-xs text-gray-500">By {blog.author}</div>
              {/* Show date if available */}
              {(blog.date || blog.createdAt) && (
                <div className="text-xs text-gray-700">
                  Date:{" "}
                  {new Date(blog.date || blog.createdAt).toLocaleDateString()}
                </div>
              )}
              {/* Show cover image */}
              {blog.coverImage && (
                <img
                  src={`http://localhost:5000${blog.coverImage}`}
                  alt="Cover"
                  className="w-32 h-20 object-cover my-2 rounded"
                />
              )}
              {/* Show other images */}
              {blog.images && blog.images.length > 0 && (
                <div className="flex flex-wrap gap-2 my-2">
                  {blog.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:5000${img}`}
                      alt={`Blog image ${idx + 1}`}
                      className="w-20 h-16 object-cover rounded"
                    />
                  ))}
                </div>
              )}
              <button
                onClick={() => handleEdit(blog)}
                className="mr-2 text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blogsmanger;
