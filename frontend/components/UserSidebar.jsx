import React from "react";
import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const UserSidebar = ({ title }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(
      `http://127.0.0.1:8000/api/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem("token");
    navigate("/");
  };

  const cms_name = localStorage.getItem("cms_name");
  const currentPath = window.location.pathname;
  const initial = cms_name.charAt(0).toUpperCase();

  return (
    <div className="sidebar">
      <div className="profile">
        <div className="avatar-initial">{initial}</div>
      </div>

      <div className="cms-name">{cms_name}</div>

      <ul className="sidebar-list">
        <Link style={{ textDecoration: "none" }} to={"/user/dashboard"}>
          <li
            className={`sidebar-item ${
              currentPath === "/user/dashboard" ? "active" : ""
            }`}
          >
            Dashboard
          </li>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/user/homepage"}>
          <li
            className={`sidebar-item ${
              currentPath === "/user/homepage" ? "active" : ""
            }`}
          >
            Homepage
          </li>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/user/post"}>
          <li
            className={`sidebar-item ${
              currentPath === "/user/post" ? "active" : ""
            }`}
          >
            My Post
          </li>
        </Link>

   
      </ul>

      <div className="logout-wrapper">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
