import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to NoteBook App 📓</h1>
      {token ? (
        <Link to="/notes"><button>Go to Notes</button></Link>
      ) : (
        <>
          <Link to="/login"><button style={{ marginRight: "10px" }}>Login</button></Link>
          <Link to="/register"><button>Register</button></Link>
        </>
      )}
    </div>
  );
};

export default Home;
