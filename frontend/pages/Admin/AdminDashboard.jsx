import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import axios from 'axios'

const AdminDashboard = () => {
    
    const [post, setPost] = useState([])
    
    const getPost  = async() => {
     const res =   await axios.get("http://127.0.0.1:8000/api/post");
        setPost(res.data);
    }
    
    useEffect(() => {
        getPost()
    }, [])

    console.log(post)
  return (
    <div>
      <div>
              <Sidebar/>
              <div style={{marginLeft: "270px"}}>
                 <h1 >Dashboard</h1>
                 <p>See and Manage Category from here</p>
               <hr /><br />
                 <div className="card" style={{border: "1px solid black",maxHeight: "100px", maxWidth: "100px", display: "flex",flexDirection: "column",  justifyContent : "center", alignItems: "center"}}>
                    <p>Total Post</p>
                 <p style={{color: "blue"}}>{post.post_count}</p>
                    
                 </div>
              </div>
             
      </div>

      
    </div>
  )
}

export default AdminDashboard
