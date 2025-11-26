import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import axios from 'axios'
import './Category.css'
import { Link } from 'react-router-dom'

const Category = () => {
    
    const [category, setCategory] = useState([])
    const token = localStorage.getItem('token')
    
    const getCategory  = async() => {
     const res =   await axios.get("http://127.0.0.1:8000/api/category", {
        headers: {
            Authorization: `Bearer ${token}`
        }
     });
        setCategory(res.data.data);
    }
    
    
        const handleDelete = async(id) => {
            await axios.delete("http://127.0.0.1:8000/api/category/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getCategory();
        }
    
    useEffect(() => {
        getCategory()
    }, [])

    console.log(category)
  return (
    <div>
      <div>
              <Sidebar />
   
              
          <div className="page-container">
    <h1 className="page-title">Manage Categories</h1>


    <hr />
    <br />
 <button  className="create-btn"><Link to={'/admin/category/add'} style={{color:"white", textDecorationLine: "none"}}>Create category</Link></button>    

    <table>
        <tr>
            <th>No</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Action</th>
        </tr>

        {category.map((c, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{c.name}</td>
                <td>{c.slug}</td>
                <td>
                  <Link to={`/admin/category/edit/${c.id}`}  style={{textDecoration: "none"}}  className="btn-edit">
    Edit
</Link>
                    <button onClick={() => handleDelete(c.id)} className="btn-delete">Delete</button>
                </td>
            </tr>
        ))}
    </table>
</div>

             
      </div>

      
    </div>
  )
}

export default Category
