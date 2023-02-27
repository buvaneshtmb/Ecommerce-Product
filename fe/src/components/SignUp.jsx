import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import LmsApiService from "../api";
import { toast } from "react-toastify";
import Loader from "./Loader";

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

  let handleRegister = async () => {
    try {
      let data = datas.filter((person) => person.email === email);
      console.log(data);
      if (firstName.length < 3) {
        toast.error("your firstName is too short");
        return navigate("/register");
      } else if (lastName.length < 2) {
        toast.alert("your LastName is too short");
        return navigate("/register");
      } else if (email.length < 12) {
        console.log("your gmail is too short");
        toast.error("your gmail is too short");
        return navigate("/register");
      } else if (mobile.length < 10) {
        console.log("your mobileNumber is too short");
        toast.error("your mobileNumber is too short");
        return navigate("/register");
      } else if (password.length < 8) {
        console.log("your password is too short");
        toast.error("your password is too short");
        return navigate("/register");
      } else if (data.length > 0) {
        toast.error("User Already exists");
        return navigate("/register");
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
        navigate("/register");
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
        navigate("/login");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
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
      <Navbar />
      {isloading ? (
        <Loader />
      ) : (
        <>
          <div className="full" style={{ width: "500px", marginLeft: "350px" }}>
            <h2 className="header">Signup Page</h2>
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
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter the Mobile"
                      max={1}
                      maxLength={10}
                      type="tel"
                      name="Phone Number"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    />
                  </div>

                  {/* <input type="tel" id="phone" name="phone" maxlength="10" 
              placeholder="123-45-678" ></input> */}

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
                  <input
                    type="submit"
                    value="Register"
                    onClick={() => {
                      handleRegister();
                    }}
                  />
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
