import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import './TambahCategory.css';

const EditCategory = () => {

    const [form, setForm] = useState({
        name: "",
        slug: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');

    const getCategory = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setForm({
                name: res.data.name,
                slug: res.data.slug
            });

        } catch (error) {
            setError("Gagal mengambil data kategori");
        }
    };

    useEffect(() => {
        getCategory();
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
            await axios.put(`http://127.0.0.1:8000/api/category/${id}`, form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            navigate('/admin/category');

        } catch (error) {
            setError("Terjadi kesalahan saat mengupdate kategori");
        }
    };
    
    


    return (
        <div className="layout">
            <Sidebar />

            <div className="right">

                <h2 className="title">Edit Category</h2>

                {error && <div className="alert">{error}</div>}

                <div className="card">
                    <form onSubmit={handleSubmit}>
                        
                        <label>Nama Category</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Masukkan nama category"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <label>Slug</label>
                        <input 
                            type="text" 
                            name="slug" 
                            placeholder="Masukkan slug"
                            value={form.slug}
                            onChange={handleChange}
                        />

                        <div className="btn-group">
                            <button type="submit" className="btn-primary">Update</button>
                            <Link to="/admin/category" className="btn-secondary">Back</Link>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default EditCategory;
