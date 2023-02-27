import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  let [email, setEmail] = useState("");
  let navigate = useNavigate();

  let getData = async () => {
    setEmail(sessionStorage.getItem("email"));
    console.log(email);
  };

  let handleLogout = async () => {
    sessionStorage.clear();
    navigate("/collections");
    window.location.reload();
  };

  let handleCart = async () => {
    if (email) {
      navigate("/cart");
    } else {
      toast.success("please login first");
      navigate("/collections");
    }
  };

  let handleFav = async () => {
    if (email) {
      navigate("/favourite");
    } else {
      toast.success("please login first");
      navigate("/collections");
    }
  };

  let handleOrder = async () => {
    navigate('/orders')
  };

  let handleProfile = async () => {
    navigate()
  };

  useEffect(() => {
    getData();
  }, [email]);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <h2 className="navbar-brand" style={{ margin: "10px 60px" }}>
            THEECODE
          </h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li
                style={{ margin: "10px 50px" }}
                onClick={() => navigate('"/collections"')}
              >
                Home
              </li>
              <li
                style={{ margin: "10px 50px", cursor: "pointer" }}
                onClick={() => handleCart()}
              >
                Cart
              </li>
              <li
                style={{ margin: "10px 50px", cursor: "pointer" }}
                onClick={() => handleFav()}
              >
                Favourite
              </li>
              {email === null || "" ? (
                <>
                  <li
                    style={{ margin: "10px 50px" }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </li>

                  <li
                    style={{ margin: "10px 50px" }}
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </li>
                </>
              ) : (
                <>
                  <li
                    style={{ margin: "10px 50px", cursor: "pointer" }}
                    onClick={() => handleOrder()}
                  >
                    Orders
                  </li>
                  <li
                    style={{ margin: "10px 50px", cursor: "pointer" }}
                    onClick={() => handleProfile()}
                  >
                    Profile
                  </li>
                  <li style={{ margin: "10px 50px" }}>{email}</li>
                  <li
                    style={{ margin: "10px 50px", cursor: "pointer" }}
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </li>
                </>
              )}

              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
