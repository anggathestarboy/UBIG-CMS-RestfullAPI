import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Admin/Register.css";

const Login = () => {
    const [form, setForm] = useState({
    
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/api/auth/login",
                form
            );

            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("cms_name", res.data.data.name);
            
            if (res.data.data.role === "user") {
            navigate("/user/dashboard");
                
            }
            
            else {
                 navigate("/admin/dashboard");
            }
           
        } catch (error) {
            setError("Username atau Password salah");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Login</h2>
                <p className="auth-subtitle">Join our Blog CMS platform</p>

                <form onSubmit={handleSubmit}>
            

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <button type="submit" className="auth-btn">Login</button>

                    {error && <p className="auth-error">{error}</p>}
                </form>

                <p className="auth-footer">
                    don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
