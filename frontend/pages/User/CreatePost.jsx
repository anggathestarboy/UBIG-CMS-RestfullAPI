import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserSidebar } from "../../components/UserSidebar";
import "./CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  useEffect(() => {
    setSlug(generateSlug(title));
  }, [title]);


  const getCategories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/category/user");
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Gagal memuat kategori");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return alert("Title tidak boleh kosong!");
    if (!slug.trim()) return alert("Slug tidak boleh kosong!");
    if (!categoryId) return alert("Category harus dipilih!");
    if (!content.trim()) return alert("Content tidak boleh kosong!");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/post",
        {
          title,
          slug,
          category_id: categoryId,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Post berhasil dibuat!");
      window.location.href = "/user/post";
    } catch (err) {
      console.log(err);
      alert("Gagal membuat post");
    }
  };

  return (
    <div className="createpost-page">

      <div className="sidebar-fixed">
        <UserSidebar />
      </div>

      <div className="createpost-content">
        <h1 className="createpost-title">Create New Post</h1>
        <hr className="divider" />

        <form onSubmit={handleSubmit} className="post-form">

   
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />


          <label className="form-label">Slug</label>
          <input
            type="text"
            className="form-input"
            placeholder="auto-generated from title"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />


          <label className="form-label">Category</label>
          <select
            className="form-input"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

       
          <label className="form-label">Content</label>
          <textarea
            className="form-textarea"
            placeholder="Write your content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit" className="btn-submit">
            Submit Post
          </button>
        </form>

      </div>
    </div>
  );
};

export default CreatePost;
