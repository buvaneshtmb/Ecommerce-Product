import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import { toast } from "react-toastify";
import LmsApiService from "../../api";

function User() {
  let [data, setData] = useState([]);
  let [search, setSearch] = useState("");
  let [isloading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  let getData = async () => {
    try {
      setIsLoading(true)
      let res = await LmsApiService.get("/users/details");
      if (res.status === 200) {
        setData(res.data.users);
        toast.success(res.data.message);
      }
      setIsLoading(false)

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        sessionStorage.clear();
        navigate("/login");
      }
    }
  };

  let handleUserDelete = async (id) => {
    console.log(id)
    try {
      setIsLoading(true)
      let res = await LmsApiService.delete(`users/del/${id}`);
      if (res.status === 200) {
        toast.error(res.status.message)
        navigate("/user");
        window.location.reload();
      }
      setIsLoading(false)
    } catch (error) {
      console.log(id)
      console.log(error);
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        sessionStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AdminDashboard />
      <div>
        <Button
          onClick={() => navigate("/add-user")}
          style={{ marginLeft: "120px", marginTop: "20px" }}
        >
          Add User
        </Button>
        <div style={{ marginLeft: "800px", marginRight: "80px" }}>
          <input
            className="form-control me-2"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>

        <Table className="center">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>FirstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>mobile</th>
              <th>primeMember</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((e) => {
                return search.toLowerCase() === ""
                  ? e
                  : e.firstName.toLowerCase().includes(search) ||
                      e.lastName.toLowerCase().includes(search);
              })
              .map((e, i) => {
                return (
                  <tr key={e._id}>
                    <td>{i + 1}</td>
                    <td>{e._id}</td>
                    <td>{e.firstName}</td>
                    <td>{e.lastName}</td>
                    <td>{e.email}</td>
                    <td>{e.mobile}</td>
                    <td>{e.primeMember}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/edit-user/${e._id}`)}
                      >
                        <i className="fa-solid fa-user-pen"></i>Edit
                      </Button>
                      &nbsp;&nbsp;&nbsp;
                      <Button
                        variant="danger"
                        onClick={() => handleUserDelete(e._id)}
                      >
                        <i className="fa-solid fa-trash"></i>Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default User;
