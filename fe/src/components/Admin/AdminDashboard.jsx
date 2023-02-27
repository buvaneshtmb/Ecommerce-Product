import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Product from "./Product";

function AdminDashboard() {
  let [email, setEmail] = useState("");
  let [firstName, setFirstName] = useState("");
  let navigate = useNavigate();

  let getData = async () => {
    setFirstName(sessionStorage.getItem("firstName"));
    setEmail(sessionStorage.getItem("email"));
  };
  let handleLogout = async () => {
    sessionStorage.clear();
    navigate("/collections");
    window.location.reload();
  };
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getData();
    } else {
      sessionStorage.clear();
      navigate("/login");
    }
  }, [firstName, email]);
  return (
    <>
      <div className="navbar">
        <h5 className="home">TheeCode</h5>
        <h5> Admin Name:{firstName}</h5>
        <ul className="ul">
          <li onClick={() => navigate("/product")}>Product</li>
          <li onClick={() => navigate("/user")}>User</li>
          <li>Notification</li>
          <li onClick={() => navigate("/adminorders")}>Orders</li>
          <li onClick={() => handleLogout()}>Logout</li>
        </ul>
      </div>
    </>
  );
}

export default AdminDashboard;
