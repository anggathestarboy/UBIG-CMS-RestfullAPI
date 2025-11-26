import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import './TambahCategory.css';

const TambahCategory = () => {

    const [form, setForm] = useState({
        name: "",
        slug: ""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/category", form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/admin/category');
        } catch (error) {
            setError("Terjadi kesalahan saat menambahkan kategori");
        }
    };

    return (
        <div className="layout">
            <Sidebar />

            <div className="right">

                <h2 className="title">Tambah Category</h2>

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
                            <button type="submit" className="btn-primary">Create</button>
                            <Link to="/admin/category" className="btn-secondary">Back</Link>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default TambahCategory;
