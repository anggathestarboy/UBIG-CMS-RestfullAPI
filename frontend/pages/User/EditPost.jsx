import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { UserSidebar } from "../../components/UserSidebar";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category_id: "",
    content: "",
    slug: ""
  });

  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/category/user");
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
      alert("Gagal memuat kategori");
    }
  };

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/post/${id}`);
      const data = res.data.data;

      setForm({
        title: data.title,
        category_id: data.category_id,
        content: data.content,
        slug: data.slug,
      });
    } catch (err) {
      console.log(err);
      alert("Gagal memuat data post.");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchPost();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/post/${id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Post berhasil diperbarui!");
      navigate("/user/post");
    } catch (error) {
      console.log(error);
      alert("Gagal update post.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div style={{ position: "fixed", left: 0, top: 0 }}>
        <UserSidebar />
      </div>

      {/* Content */}
      <div
        style={{
          marginLeft: "270px",
          padding: "40px",
          width: "100%",
        }}
      >
        <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>Edit Post</h2>

        <hr
          style={{
            marginTop: "8px",
            marginBottom: "25px",
            border: "none",
            borderTop: "1px solid #ddd",
          }}
        />

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            maxWidth: "700px",
          }}
        >
          {/* Title */}
          <label style={{ fontSize: "15px", marginBottom: "5px", color: "#333" }}>
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #bbb",
              borderRadius: "5px",
              marginBottom: "18px",
              fontSize: "15px",
            }}
          />

          {/* Category */}
          <label style={{ fontSize: "15px", marginBottom: "5px", color: "#333" }}>
            Category
          </label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #bbb",
              borderRadius: "5px",
              marginBottom: "18px",
              fontSize: "15px",
              background: "white",
            }}
          >
            <option value="" disabled>
              -- Pilih Kategori --
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Slug */}
          <label style={{ fontSize: "15px", marginBottom: "5px", color: "#333" }}>
            Slug
          </label>
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "1px solid #bbb",
              borderRadius: "5px",
              marginBottom: "18px",
              fontSize: "15px",
            }}
          />

          {/* Content */}
          <label style={{ fontSize: "15px", marginBottom: "5px", color: "#333" }}>
            Content
          </label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="6"
            required
            style={{
              padding: "10px",
              border: "1px solid #bbb",
              borderRadius: "5px",
              resize: "vertical",
              minHeight: "160px",
              marginBottom: "18px",
              fontSize: "15px",
            }}
          ></textarea>

          {/* Submit */}
          <button
            type="submit"
            style={{
              width: "160px",
              padding: "10px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "15px",
            }}
            onMouseOver={(e) => (e.target.style.background = "#0069d9")}
            onMouseOut={(e) => (e.target.style.background = "#007bff")}
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
