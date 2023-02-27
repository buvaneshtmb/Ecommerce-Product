import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import LmsApiService from "../api";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Loader from "./Loader";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  let [isloading, setIsLoading] = useState(false);

  let handleLogin = async () => {
    try {
      setIsLoading(true);
      let res = await LmsApiService.post("users/login", { email, password });
      if (res.status === 200) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userid", res.data.userid);
        sessionStorage.setItem("role", res.data.role);
        sessionStorage.setItem("email", res.data.email);
        sessionStorage.setItem("firstName", res.data.firstName);

        if (res.data.role === "admin") {
          navigate("/product");
          toast.success(res.data.message);
        } else navigate("/user-dashboard");
        toast.success(res.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      {isloading ? (
        <Loader />
      ) : (
        <>
          <form style={{ width: "450px", marginLeft: "450px" }}>
            <div className="full">
              <h2 className="header">Admin Login</h2>
              <div id="form">
                <div className="lab">
                  <div className="lab1">
                    <label htmlFor="id">Email</label>
                    <input
                      type="email"
                      id="id"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter the Email"
                      autoFocus
                      // pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
                    />
                  </div>
                  <div className="lab2">
                    <label htmlFor="adpwd">Password</label>
                    <input
                      type="password"
                      id="adpwd"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter the Password"
                    />
                  </div>
                </div>
                <div className="log">
                  <Button variant="primary" onClick={() => handleLogin()}>
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default Login;
