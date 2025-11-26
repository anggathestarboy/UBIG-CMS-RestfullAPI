import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

export const Sidebar = ({ title }) => {
    const cms_name = localStorage.getItem('cms_name')
     const currentPath = window.location.pathname;
      const initial = cms_name.charAt(0).toUpperCase(); 
    return (
        <div className="sidebar">
            <div className="profile">
                  <div className="avatar-initial">
                    {initial}
                </div>
                
            </div>
            
     <div style={{textAlign: "center"}} className="cms-name">{cms_name}</div>
            

           <ul className="sidebar-list">
            <Link style={{textDecoration: "none"}} to={'/admin/dashboard'}>
       <li 
          className={`sidebar-item ${currentPath === '/admin/dashboard' ? 'active' : ''}`}
        >
            
          Dashboard
          
        </li>
        </Link>
 <Link to={'/admin/category'} style={{textDecoration: "none"}}>
        <li 
          className={`sidebar-item ${currentPath === '/admin/category' ? 'active' : ''}`}
        >
            Categories
         
        </li>
</Link>
        <li style={{textDecoration: "none"}}
          className={`sidebar-item ${currentPath === '/admin/settings' ? 'active' : ''}`}
        >
          Settings
        </li>
      </ul>
        </div>
    );
};
