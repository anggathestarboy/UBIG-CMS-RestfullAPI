import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Admin/Register";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Category from "../pages/Admin/Category";
import TambahCategory from "../pages/Admin/TambahCategory";
import EditCategory from "../pages/Admin/EditCategory";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />
                    <Route path="/admin/category" element={<Category />} />
                    <Route
                        path="/admin/category/edit/:id"
                        element={<EditCategory />}
                    />

                    <Route
                        path="/admin/category/add"
                        element={<TambahCategory />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
