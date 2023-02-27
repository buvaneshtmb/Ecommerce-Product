import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LmsApiService from "../../api";
import Loader from "../Loader";
import AdminDashboard from "./AdminDashboard";

function SignUp() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [mobile, setMobile] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [datas, setData] = useState([]);
  let [isloading, setIsLoading] = useState(false);

  console.log(datas);
  let navigate = useNavigate();

  let handleAddUser = async () => {
    try {
      let data = datas.filter((person) => person.email === email);
      console.log(data);
      if (firstName.length < 3) {
        toast.error("your firstName is too short");
        return navigate("/add-user");
      } else if (lastName.length < 2) {
        toast.error("your LastName is too short");
        return navigate("/add-user");
      } else if (email.length < 12) {
        console.log("your gmail is too short");
        toast.error("your gmail is too short");
        return navigate("/add-user");
      } else if (mobile.length < 10) {
        console.log("your mobileNumber is too short");
        toast.error("your mobileNumber is too short");
        return navigate("/add-user");
      } else if (password.length < 8) {
        console.log("your password is too short");
        toast.error("your password is too short");
        return navigate("/add-user");
      } else if (data.length > 0) {
        toast.error("User Already exists");
        return navigate("/add-user");
      } else {
        let data = {
          firstName,
          lastName,
          mobile,
          email,
          password,
        };
        registerData(data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        sessionStorage.clear();
        navigate("/add-user");
      }
    }
  };

  let registerData = async (data) => {
    try {
      setIsLoading(true);
      console.log(data);
      let res = await LmsApiService.post("users/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
      });
      if (res.status === 201) {
        console.log(res.data);
        toast.success(res.data.message);
        navigate("/user");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        sessionStorage.clear();
        navigate("/add-user");
      }
    }
  };

  let getData = async () => {
    try {
      setIsLoading(true);
      let res = await LmsApiService.get("/users/details");
      if (res.status === 200) {
        console.log(res.data.users);
        setData(res.data.users);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        sessionStorage.clear();
        navigate("/signup");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AdminDashboard />
      {isloading ? (
        <Loader />
      ) : (
        <>
          <div className="full" style={{ width: "500px", marginLeft: "350px" }}>
            <h2 className="header"> Add User</h2>
            <form>
              <div id="form">
                <div className="lab">
                  <div className="lab1">
                    <label htmlFor="id">First Name</label>
                    <input
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter the FirstName"
                      autoFocus
                    />
                  </div>
                  <div className="lab1">
                    <label htmlFor="id">Last Name</label>
                    <input
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter the LastName"
                    />
                  </div>
                  <div className="lab1">
                    <label htmlFor="id">Email</label>
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter the Email"
                      pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
                    />
                  </div>
                  <div className="lab1">
                    <label htmlFor="id">Mobile No</label>
                    <input
                      type="text"
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter the Mobile"
                      max={1}
                      maxLength={10}
                      pattern="[0-9]{1}"
                    />
                  </div>
                  <div className="lab1">
                    <label htmlFor="adpwd">Password</label>
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter the Password"
                    />
                  </div>
                </div>
                <div className="log">
                  <Button
                    onClick={() => handleAddUser()}
                    style={{ marginLeft: "150px" }}
                  >
                    Add User
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default SignUp;
