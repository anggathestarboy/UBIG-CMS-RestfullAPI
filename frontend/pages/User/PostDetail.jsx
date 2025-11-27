import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Sidebar } from '../../components/Sidebar'
import './PostDetail.css'
import { UserSidebar } from '../../components/UserSidebar'

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const token = localStorage.getItem("token");    
    const [newComment, setNewComment] = useState("");
    
    const [editingCommentId, setEditingCommentId] = useState(null);
const [editText, setEditText] = useState("");


const [authUser, setAuthUser] = useState([]);

const getAuthUser = async () => {
    try {
        const res = await axios.get("http://127.0.0.1:8000/api/user", {
            headers: { Authorization: `Bearer ${token}` }
        });
        setAuthUser(res.data); 
    } catch (err) {
        console.log(err);
    }
};

    
    

const handleUpdateComment = async (id) => {
    if (!editText.trim()) return alert("Komentar tidak boleh kosong!");

    try {
        await axios.put(
            `http://127.0.0.1:8000/api/comment/${id}`,
            { content: editText },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        setEditingCommentId(null);
        setEditText("");
        getComments();
    } catch (err) {
        console.log(err);
        alert("Gagal update komentar");
    }
};


const handleDeleteComment = async (id) => {
    if (!window.confirm("Yakin ingin menghapus komentar ini?")) return;

    try {
        await axios.delete(`http://127.0.0.1:8000/api/comment/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        getComments();
    } catch (err) {
        console.log(err);
        alert("Gagal menghapus komentar");
    }
};


    
    const handleUnlike = async (id) => {
    try {
        await axios.delete(`http://127.0.0.1:8000/api/comment/${id}/unlike`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        getComments(); 
    } catch (err) {
        console.log(err);
    }
};

    
    const handleAddComment = async () => {
    if (!newComment.trim()) return alert("Komentar tidak boleh kosong!");

    try {
        await axios.post("http://127.0.0.1:8000/api/comment", 
            {
                content: newComment,
                post_id: id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        setNewComment("");  
        getComments();      
    } catch (err) {
        console.log(err);
        alert("Gagal mengirim komentar");
    }
};


    const getDetail = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/post/${id}`);
        setPost(res.data.data);
    };

    
    
    const [comments, setComments] = useState([]);

const getComments = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/api/post/${id}/comments`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    setComments(res.data.data);
};


const handleLike = async(id) => {
  await axios.post(`http://127.0.0.1:8000/api/comment/${id}/like`, {},{
        headers: {
            Authorization: `Bearer ${token}`
        }
        
    });
    getComments();
}

    
    useEffect(() => {
        getDetail();
        getAuthUser();

        getComments();
    }, []);

  
    
    console.log(authUser)

    return (
        <div className="detail-page-container">

            <UserSidebar />

            <div className="detail-content">

                <h1 className="detail-title">{post?.title}</h1>

                <div className="detail-meta">
                    <span>By {post?.user?.name}</span>
                    <span>| Category: {post?.category?.name}</span>
                    <span>| {post?.created_at}</span>
                </div>

                <p className="detail-body">{post?.content}</p>

                <hr className="divider" />


            
                <h3 className="comment-title">Add Comment</h3>

<div className="comment-form">
    <textarea
        className="comment-input"
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
    />

    <button className="comment-submit" onClick={handleAddComment}>
        Submit
    </button>
</div>

<hr className="divider" />

            
            
               <h3 className="comment-title">Comments ({comments.length})</h3>

<div className="comment-list">
    {comments.length === 0 && (
        <p className="no-comment">No comments yet.</p>
    )}

    {comments.map((c) => (
        <div className="comment-item" key={c.id}>
            <div className="comment-header">
                <strong>{c.user.name}</strong>
                <span className="comment-date">
                    {new Date(c.created_at).toLocaleString()}
                </span>
            </div>

{authUser?.id === c.user.id && (
    <div style={{ marginTop: "10px" }}>
        {editingCommentId === c.id ? (
            <>
                <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => handleUpdateComment(c.id)}>
                    Save
                </button>
                <button onClick={() => setEditingCommentId(null)}>
                    Cancel
                </button>
            </>
        ) : (
            <>
                <button
                    onClick={() => {
                        setEditingCommentId(c.id);
                        setEditText(c.content);
                    }}
                >
                    Edit
                </button>

                <button onClick={() => handleDeleteComment(c.id)}>
                    Delete
                </button>
            </>
        )}
    </div>
)}


            <p className="comment-text">{c.content}</p>
   <button onClick={() => handleLike(c.id)}>
      Like
    </button>
    
    
    <button onClick={() => handleUnlike(c.id)}>
    Unlike
</button>
    
            <div className="comment-footer">
                <span className="like-info">
                    ❤️ {c.likes} likes
                </span>
            </div>
            <br /><br />
        </div>
        
    ))}
</div>

            </div>
        </div>
    );
};

export default PostDetail;
