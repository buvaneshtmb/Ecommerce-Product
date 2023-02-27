import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "react-bootstrap";
import LmsApiService from "../../api";
import Loader from "../Loader";

function AddProduct() {
  let [productName, setProductName] = useState("");
  let [image, setImage] = useState("");
  let [quantity, setQuantity] = useState("");
  let [originalPrice, setOriginalPrice] = useState("");
  let [sellingPrice, setSellingPrice] = useState("");
  let [decscription, setDecscription] = useState("");
  let [isloading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  let handleAddProduct = async () => {
    if (productName.length < 3) {
      alert("product name is too short");
      return navigate("/add-product");
    } else if (image.length < 3) {
      alert("product Image is too short");
      return navigate("/add-product");
    } else if (quantity.length <= 0) {
      alert("Fill the product quantity");
      return navigate("/add-product");
    } else if (quantity > 100000) {
      alert("Quantity is less than 1,00,000");
      return navigate("/add-product");
    } else if (originalPrice.length <= 0) {
      alert("Fill the OriginalPrice");
      return navigate("/add-product");
    } else if (originalPrice <= 0) {
      alert("OriginalPrice is not less than zero");
      return navigate("/add-product");
    } else if (originalPrice > 300000) {
      alert("OriginalPrice is not greater than 3,00,000");
      return navigate("/add-product");
    } else if (sellingPrice.length <= 0) {
      alert("Fill the sellingPrice");
      return navigate("/add-product");
    } else if (sellingPrice <= 0) {
      alert("sellingPrice is not less than Zero");
      return navigate("/add-product");
    } else if (sellingPrice > 200000) {
      alert("SellingPrice is not greater than 2,00,000");
      return navigate("/add-product");
    } else if (decscription.length < 10) {
      alert("product description is too short");
      return navigate("/add-product");
    } else {
      let data = {
        productName,
        image,
        quantity,
        originalPrice,
        sellingPrice,
        decscription
      };
      try {
        setIsLoading(true);
        let res = await LmsApiService.post("/add-product", {
          productName: productName,
          image: image,
          quantity: quantity,
          originalPrice: originalPrice,
          sellingPrice: sellingPrice,
          decscription: decscription
        });
        if (res.status === 201) {
          console.log(res.data);
          navigate("/product");
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Handle and convert it in base 64
  let handleImage = async (e) => {
    const file = e.target.files[0]
    console.log(e.target.files)
    console.log(file)
    setFileToBase(file);
    console.log(setFileToBase);
  };

  let setFileToBase = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader)
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  return (
    <>
      <AdminDashboard />
      {isloading ? (
        <Loader />
      ) : (
        <>
          <div className="full" style={{ width: "500px", marginLeft: "350px" }}>
            <h2 className="header">Add Product</h2>
            <form encType="multipart/form-data">
              <div id="form">
                <div className="lab">
                  <div className="lab1">
                    <label htmlFor="id">ProductName</label>
                    <input
                      type="text"
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Enter the ProductName"
                      autoFocus
                    />
                  </div>
                  <div className="lab1">
                    <label htmlFor="id">Image</label>
                    <input type="file" onChange={handleImage} />
                  </div>
                  <div className="lab1">
                    <label>Quantity</label>
                    <input
                      type="number"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="lab1">
                    <label> OriginalPrice</label>
                    <input
                      type="number"
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="Enter the OriginalPrice"
                      max={1}
                      maxLength={10}
                      pattern="[0-9]{1}"
                    />
                  </div>
                  <div className="lab1">
                    <label>SellingPrice</label>
                    <input
                      type="number"
                      onChange={(e) => setSellingPrice(e.target.value)}
                      placeholder="Enter the SellingPrice"
                    />
                  </div>
                  <div className="lab1">
                    <label>Description</label>
                    <input
                      type="text"
                      onChange={(e) => setDecscription(e.target.value)}
                      placeholder="Enter the Description"
                    />
                  </div>
                </div>
                <Button
                  style={{ marginLeft: "200px" }}
                  onClick={() => {
                    handleAddProduct();
                  }}
                >
                  {" "}
                  Add Product
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default AddProduct;
