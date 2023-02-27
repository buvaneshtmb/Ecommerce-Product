import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import LmsApiService from "../../api";
import { toast } from "react-toastify";
import Loader from "../Loader";

function Product() {
  let [search, setSearch] = useState("");
  let [data, setData] = useState([]);
  let [isloading, setIsLoading] = useState(false);
  console.log(data)

  let navigate = useNavigate();
  let params = useParams();
  // console.log(params.id);

  let getData = async () => {
    try {
      setIsLoading(true);
      let res = await LmsApiService("/get-allproduct");
      if (res.status === 200) {
        setData(res.data.product);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        sessionStorage.clear();
        navigate("/login");
      }
    }
  };
  let handleDelete = async (id) => {
    try {
      setIsLoading(true);
      let res = await LmsApiService.delete(`/delete-product/${id}`);
      if (res.status === 200) {
        toast.warn(res.data.message);
        navigate("/product");
        window.location.reload();
      }
      setIsLoading(false);
    } catch (error) {
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
      {isloading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Button
              style={{ marginLeft: "120px", marginTop: "20px" }}
              onClick={() => navigate("/add-product")}
            >
              Add Product
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
                  <th style={{ textAlign: "center" }}>ID</th>
                  <th style={{ textAlign: "center" }}>ProductName</th>
                  <th style={{ textAlign: "center" }}>Product Image</th>
                  <th style={{ textAlign: "center" }}>Quantity</th>
                  <th style={{ textAlign: "center" }}>Original Price</th>
                  <th style={{ textAlign: "center" }}>Selling Price</th>
                  <th style={{ textAlign: "center" }}>Description</th>
                  <th style={{ textAlign: "center" }}>Edit</th>
                  <th style={{ textAlign: "center" }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((e) => {
                    return search.toLowerCase() === ""
                      ? e
                      : e.productName.toLowerCase().includes(search) ||
                          e.sellingPrice.toString().includes(search);
                  })
                  .map((e, i) => {
                    return (
                      <tr key={e._id}>
                        <td style={{ textAlign: "center" }}>{i + 1}</td>
                        <td style={{ textAlign: "center" }}>{e.productName}</td>  
                        <td style={{ textAlign: "center" }}>
                          <img src={e.image.url} style={{ height: "75px" }}></img>
                        </td>
                        <td style={{ textAlign: "center" }}>{e.quantity}</td>
                        <td style={{ textAlign: "center" }}>
                          {e.originalPrice}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {e.sellingPrice}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {e.decscription}
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => navigate(`/edit-product/${e._id}`)}
                          >
                            <i
                              className="fa-solid fa-user-pen"
                              style={{ marginRight: "5px" }}
                            ></i>
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(e._id)}
                          >
                            <i
                              className="fa-solid fa-trash"
                              style={{ marginRight: "5px" }}
                            ></i>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </>
  );
}

export default Product;
