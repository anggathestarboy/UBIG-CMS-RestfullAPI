import React from 'react'
import { UserSidebar } from '../../components/UserSidebar'

const Dashboard = () => {
  return (
    <div style={{ display: "flex" }}>

  
      <div style={{ position: "fixed", left: 0, top: 0 }}>
        <UserSidebar />
      </div>


      <div 
        style={{
          marginLeft: "270px",
          padding: "20px",
          width: "100%",
          Height: "100vh",
          background: "#ffffff"
        }}
      >
        <h1 style={{ marginBottom: "5px" }}>Dashboard</h1>
        <hr style={{ marginBottom: "40px" }} />

        <div
          style={{
            width: "420px",
            height: "130px",
            background: "#f8f9fa",
            border: "1px solid #ddd",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            margin: "0 auto", 
            fontSize: "16px",
            fontWeight: "500"
          }}
        >
           silakan kelola postingan Anda di <br /> menu My Posts
        </div>

      </div>
    </div>
  )
}

export default Dashboard
