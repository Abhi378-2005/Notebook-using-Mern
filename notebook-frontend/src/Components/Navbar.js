import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{
      padding: "10px 20px",
      borderBottom: "1px solid #ccc",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <Link to="/" style={{ marginRight: "15px" }}><strong>NoteBook App</strong></Link>
        {token && <Link to="/notes" style={{ marginRight: "15px" }}>Notes</Link>}
      </div>
      <div>
        {!token ? (
          <>
            <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
