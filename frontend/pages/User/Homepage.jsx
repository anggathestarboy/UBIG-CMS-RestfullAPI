import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import './Homepage.css'; // ← tambahkan ini
import { UserSidebar } from '../../components/UserSidebar';

const Homepage = () => {
    
    const [post, setPost] = useState([]);
    
    const getPost = async() => {
        const res = await axios.get("http://127.0.0.1:8000/api/post");
        setPost(res.data.data.flat())
    }
    
    useEffect(() => {
        getPost();
    }, [])
    
  return (
   <div className="homepage-container">
        
    <UserSidebar />

    <div className="post-wrapper">
      <h2 className="section-title">Latest Posts</h2>

      <input type="text" className="search-box" placeholder="Search posts..." />

      <div className="post-list">
        {post.map((p) => (
          <div className="post-card" key={p.id}>

              <span className="category-badge">{p.category.name}</span>

              <h1 className="title">{p.title}</h1>

              <p className="excerpt">{p.excerpt}</p>

              <i className="author">By {p.user.name}</i>

              <Link className="readmore-btn" to={`/user/post/${p.id}`}>
                  Read More
              </Link>

          </div>
        ))}
      </div>

    </div>

</div>

  )
}

export default Homepage;
