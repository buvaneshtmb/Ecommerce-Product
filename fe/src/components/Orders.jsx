import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import LmsApiService from "../api";
import { toast } from "react-toastify";
import Loader from "./Loader";

function Orders() {
  let [data, setData] = useState([]);
  let [isloading, setIsLoading] = useState(false);

  console.log(data);

  let getData = async () => {
    try {
      setIsLoading(true);
      let email = sessionStorage.getItem("email");
      console.log(email);
      let res = await LmsApiService.get(`get-buy-product/${email}`);
      if (res.status === 200) {
        setData(res.data.buy);
        console.log(res.data.buy);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
      ) : data === null ? (
        "No orders Ordered"
      ) : (
        <>
          <div>
            <Table className="center">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>ID</th>
                  <th style={{ textAlign: "center" }}>Product Name</th>
                  <th style={{ textAlign: "center" }}>Product Image</th>
                  <th style={{ textAlign: "center" }}> Quantity</th>
                  <th style={{ textAlign: "center" }}>Price</th>
                  <th style={{ textAlign: "center" }}> OrderStatus</th>
                  <th style={{ textAlign: "center" }}>DeliveryDate</th>
                </tr>
              </thead>
              <tbody>
                {data.map((e, i) => {
                  return (
                    <tr key={e._id}>
                      <td style={{ textAlign: "center" }}>{i + 1}</td>
                      <td style={{ textAlign: "center" }}>{e.productName}</td>
                      <td style={{ textAlign: "center" }}>
                        <img src={e.image} style={{ height: "75px" }}></img>
                      </td>
                      <td style={{ textAlign: "center" }}>{e.quantity}</td>
                      <td style={{ textAlign: "center" }}>{e.amount}</td>
                      <td style={{ textAlign: "center" }}>{e.orderStatus}</td>
                      <td style={{ textAlign: "center" }}>{e.deliveryDate}</td>
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

export default Orders;
