import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Favourite() {
  let [fav, setFav] = useState([]);
  console.log(fav);
  let getData = async () => {
    let data = JSON.parse(sessionStorage.getItem("fav"));
    setFav(data);
  };
  let handleRemove = async () => {
    sessionStorage.removeItem("fav");
    window.location.reload();
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <div>
        {fav === null ? (
          "No Favourites Added"
        ) : (
          <table className="center">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Selling price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {fav.map((e, i) => {
                return (
                  <tr className="data" key={e.i}>
                    <td id="pn">{e.pn}</td>
                    <td>
                      <img src={e.image} style={{ height: "75px" }} />
                    </td>
                    <td id="sp">{e.sp}</td>
                    <td id="quantity">{e.qty}</td>
                    <td>
                      <button onClick={() => handleRemove()}>Remove</button>
                    </td>
                  </tr>
                );
              })}
              <tr className="data">
                <td id="pn">{fav?.pn}</td>
                <td>
                  <img src={fav?.image} style={{ height: "75px" }} />
                </td>
                <td id="sp">{fav?.sp}</td>
                <td id="quantity">{fav?.qty}</td>
                <td>
                  <button onClick={() => remove()}>Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Favourite;
