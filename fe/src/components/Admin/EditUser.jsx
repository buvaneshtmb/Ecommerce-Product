import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LmsApiService from "../../api";
import AdminDashboard from "./AdminDashboard";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function EditUser() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [mobile, setMobile] = useState("");
  let [email, setEmail] = useState("");
  let [isloading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  let params = useParams();
  console.log(params.id);

  let handleUpdateUser = async () => {
    try {
      // console.log(data);
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
      } else {
        let data = {
          firstName,
          lastName,
          mobile,
          email,
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
      let res = await LmsApiService.put(`users/update/${params.id}`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
      });
      if (res.status === 200) {
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
        navigate("/user");
      }
    }
  };

  let getData = async () => {
    try {
      setIsLoading(true);
      let res = await LmsApiService.get(`/users/one-user/${params.id}`);
      console.log(res.status);
      if (res.status === 200) {
        console.log(res.data);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
        setMobile(res.data.mobile);
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
      <>
        <AdminDashboard />
        {isloading ? (
          <Loader />
        ) : (
          <>
            <div
              className="full"
              style={{ width: "500px", marginLeft: "350px" }}
            >
              <h2 className="header"> Add User</h2>
              <form>
                <div id="form">
                  <div className="lab">
                    <div className="lab1">
                      <label htmlFor="id">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter the FirstName"
                        autoFocus
                      />
                    </div>
                    <div className="lab1">
                      <label htmlFor="id">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter the LastName"
                      />
                    </div>
                    <div className="lab1">
                      <label htmlFor="id">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter the Email"
                        pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
                      />
                    </div>
                    <div className="lab1">
                      <label htmlFor="id">Mobile No</label>
                      <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter the Mobile"
                        max={1}
                        maxLength={10}
                        pattern="[0-9]{1}"
                      />
                    </div>
                  </div>
                  <div className="log">
                    <Button
                      onClick={() => handleUpdateUser()}
                      style={{ marginLeft: "150px" }}
                    >
                      Edit User
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </>
    </>
  );
}

export default EditUser;
