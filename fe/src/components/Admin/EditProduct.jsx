import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import { Button, Toast } from "react-bootstrap";
import LmsApiService from "../../api";
import { toast } from "react-toastify";
import Loader from "../Loader";

function EditProduct() {
  let [productName, setProductName] = useState("");
  let [image, setImage] = useState("");
  let [quantity, setQuantity] = useState("");
  let [originalPrice, setOriginalPrice] = useState("");
  let [sellingPrice, setSellingPrice] = useState("");
  let [decscription, setDecscription] = useState("");
  let [isloading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  let params = useParams();
  console.log(params);

  let handleEditProduct = async () => {
    console.log("bjhfbdsjhfhbdsjfvdsvfvhdsvfhdsg");

    try {
      // setIsLoading(true);
      let res = await LmsApiService.put(`/update-product/${params.id}`, {
        $set: {
          productName: productName,
          image: image,
          quantity: quantity,
          originalPrice: originalPrice,
          sellingPrice: sellingPrice,
          decscription: decscription,
        },
      });
      if (res.status === 200) {
        console.log(res.data, "bjhfbdsjhfhbdsjfvdsvfvhdsvfhdsg");
        toast.success(res.data.message);
        navigate("/product");
        window.location.reload();
      }
      // setIsLoading(false);
    } catch (error) {
      console.log("bjhfbdsjhfhbdsjfvdsvfvhdsvfhdsg");
      console.log(error);
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        sessionStorage.clear();
        navigate("/login");
      }
    }
  };

  let getData = async () => {
    try {
      setIsLoading(true);
      let res = await LmsApiService.get(`/get-oneproduct/${params.id}`);
      if (res.status === 200) {
        console.log(res.data);
        setProductName(res.data.product.productName);
        setImage(res.data.product.image);
        setQuantity(res.data.product.quantity);
        setOriginalPrice(res.data.product.originalPrice);
        setSellingPrice(res.data.product.sellingPrice);
        setDecscription(res.data.product.decscription);
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
    if (sessionStorage.getItem("token")) {
      getData();
    } else {
      sessionStorage.clear();
      navigate("/login");
    }
  }, []);

  //Handle and convert it in base 64
  let handleImage = async (e) => {
    const file = e.target.files[0];
    console.log(e.target.files);
    console.log(file);
    setFileToBase(file);
    console.log(setFileToBase);
  };

  let setFileToBase = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);
    reader.onloadend = () => {
      setImage(reader.result);
      console.log(reader.result);
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
            <form>
              <div id="form">
                <div className="lab">
                  <div className="lab1">
                    <label htmlFor="id">ProductName</label>
                    <input
                      type="text"
                      value={productName}
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
                      value={quantity}
                      placeholder="Enter the Quantity"
                    />
                  </div>
                  <div className="lab1">
                    <label> OriginalPrice</label>
                    <input
                      type="number"
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="Enter the OriginalPrice"
                      value={originalPrice}
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
                      value={sellingPrice}
                      placeholder="Enter the SellingPrice"
                    />
                  </div>
                  <div className="lab1">
                    <label>Description</label>
                    <input
                      type="text"
                      onChange={(e) => setDecscription(e.target.value)}
                      value={decscription}
                      placeholder="Enter the Description"
                    />
                  </div>
                </div>
                <Button
                  style={{ marginLeft: "200px" }}
                  onClick={() => {
                    handleEditProduct();
                  }}
                >
                  Edit Product
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default EditProduct;
