import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserSidebar } from "../../components/UserSidebar";
import "./MyPosts.css";
import { Link, useNavigate } from "react-router-dom";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const getMyPosts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/myposts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Gagal mengambil data postingan");
    }
  };
  
  
  const handleDelete = async(id) => {
    await axios.delete("http://127.0.0.1:8000/api/post/" + id, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    getMyPosts();
  }
  const navigate = useNavigate();
  
  const handleTambah = () => {
    navigate('/user/post/add')
  }
  
  

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <div className="myposts-page">

      <div className="sidebar-fixed">
        <UserSidebar />
      </div>

      <div className="myposts-content">
        <h1 className="myposts-title">My Posts</h1>
        <hr className="myposts-divider" />

        <button onClick={handleTambah} style={{background: "blue", "color": "white", "padding" : "14px", "borderRadius": "20px", "border": "none"  }}>Tambah Data</button>
<br /><br />
        <div className="posts-container">
          {posts.length === 0 ? (
            <p className="no-post-message">Anda belum membuat postingan.</p>
          ) : (
            posts.map((post) => (
              <div className="post-card" key={post.id}>
                <h3 className="post-title">{post.title}</h3>

                <p className="post-snippet">
                  {post.content.substring(0, 100)}...
                </p>

                <div className="post-meta">
                  <span>Dibuat: {new Date(post.created_at).toLocaleString()}</span>
                </div>

                <div className="post-actions">
          

                  <Link to={`/user/post/${post.id}/edit`} className="btn-edit">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(post.id)} style={{background: "red", border: "none", borderRadius: "5px"}}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default MyPosts;
