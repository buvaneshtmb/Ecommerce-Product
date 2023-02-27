import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

function Cart() {
  let [cart, setCart] = useState([]);
  let getData = async () => {
    let data = JSON.parse(sessionStorage.getItem("cart"));
    setCart(data);
  };
  let handleRemove = async () => {
    sessionStorage.removeItem("cart");
    window.location.reload();
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <div>
        {cart === null ? (
          "No Cart Added"
        ) : (
          <table className="center">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Selling price</th>
                <th>Quantity</th>
                <td>Total</td>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((e, i) => {
                return (
                  <tr className="data" key={e.i}>
                    <td id="pn">{e.pn}</td>
                    <td>
                      <img src={e.image} style={{ height: "75px" }} />
                    </td>
                    <td id="sp">{e.sp}</td>
                    <td id="quantity">{e.qty}</td>
                    <td id="total">
                      {e.sp}*{e.qty}
                    </td>
                    <td>
                      <button onClick={() => handleRemove()}>Remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Cart;
