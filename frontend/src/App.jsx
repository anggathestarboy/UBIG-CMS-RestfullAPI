import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Admin/Register";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Category from "../pages/Admin/Category";
import TambahCategory from "../pages/Admin/TambahCategory";
import EditCategory from "../pages/Admin/EditCategory";
import Login from "../pages/Login";
import Dashboard from "../pages/User/Dashboard";
import Homepage from "../pages/User/Homepage";
import PostDetail from "../pages/User/PostDetail";
import MyPosts from "../pages/User/MyPosts";
import CreatePost from "../pages/User/CreatePost";
import EditPost from "../pages/User/EditPost";
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />
                    <Route path="/user/dashboard" element={<Dashboard/>} />
                    <Route path="/user/homepage" element={<Homepage/>} />
                    <Route path="/admin/category" element={<Category />} />
                    <Route
                        path="/admin/category/edit/:id"
                        element={<EditCategory />}
                    />

<Route path="/user/post/:id" element={<PostDetail/>}/>
                    <Route
                        path="/admin/category/add"
                        element={<TambahCategory />}
                    />
                    <Route path="/user/post" element={<MyPosts/>}/>
                    <Route path="user/post/:id/edit" element={<EditPost/>} />
                    <Route path="/user/post/add" element={<CreatePost/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
