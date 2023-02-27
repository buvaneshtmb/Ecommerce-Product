import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LmsApiService from "../api";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import Loader from "./Loader";

function ProductDetails() {
  let [productName, setProductName] = useState();
  let [image, setImage] = useState();
  let [quantity, setQuantity] = useState();
  let [originalPrice, setOriginalPrice] = useState();
  let [sellingPrice, setSellingPrice] = useState();
  let [description, setDescription] = useState();
  let [qty, setQty] = useState(0);
  let [cart, setCart] = useState([]);
  let [fav, setFav] = useState([]);
  let [email, setEmail] = useState("");
  let [isloading, setIsLoading] = useState(false);

  let params = useParams();
  let navigate = useNavigate();

  console.log(params.id);

  let handlePlus = async () => {
    if (qty < 10) {
      qty++;
      setQty(qty);
    }
  };
  let handleMinus = async () => {
    if (qty > 0) {
      qty--;
      setQty(qty);
    }
  };

  let handleBtnCart = async () => {
    if (email) {
      if (qty > 0) {
        let ca = {
          pn: productName,
          qty: qty,
          sp: sellingPrice,
          image: image,
        };
        setCart((current) => [...current, ca]);
        // alert(`${productName} added to the Cart`);
        toast.success(`${productName} added to the Cart`);
      } else {
        // alert("Please add Quantity");
        toast.error("Please add Quantity");
      }
    } else {
      // alert("Please Login First");
      toast.error("Please Login First");
    }
  };
  let handleBtnFav = async () => {
    if (email) {
      if (qty > 0) {
        let fa = {
          pn: productName,
          qty: qty,
          image: image,
          sp: sellingPrice,
        };
        setFav((current) => [...current, fa]);
        // sessionStorage.setItem("fav", JSON.stringify(fav));
        // alert(`${productName} addded in Favourite`);
        toast.success(`${productName} addded in Favourite`);
      } else {
        // alert("Please add Quantity");
        toast.error("Please add Quantity");
      }
    } else {
      // alert("Please Login First");
      toast.error("Please Login First");
    }
  };

  let getData = async () => {
    try {
      setIsLoading(true);
      let em = setEmail(sessionStorage.getItem("email"));
      let res = await LmsApiService.get(`/get-oneproduct/${params.id}`);
      if (res.status === 200) {
        console.log(res.data.product);
        setProductName(res.data.product.productName);
        setImage(res.data.product.image.url);
        setQuantity(res.data.product.quantity);
        setOriginalPrice(res.data.product.originalPrice);
        setSellingPrice(res.data.product.sellingPrice);
        setDescription(res.data.product.description);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  let getCartFav = async () => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
    sessionStorage.setItem("fav", JSON.stringify(fav));
    console.log(cart);
    console.log(fav);
  };
  useEffect(() => {
    getCartFav();
  }, [cart, fav]);

  useEffect(() => {
    let email = sessionStorage.getItem("email");
    getData();
  }, []);

  let loadRazorpay = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        setIsLoading(true);
        const result = await LmsApiService.post("/create-order", {
          amount: parseInt(sellingPrice) * parseInt(qty) + "00",
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await LmsApiService.get("/get-razorpay-key");

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: "example name",
          description: "example transaction",
          order_id: order_id,
          handler: async function (response) {
            const result = await LmsApiService.post("/pay-order", {
              amount: amount / 100,
              userEmail: email,
              productName: productName,
              image: image,
              quantity: qty,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            alert(result.data.msg);
            // fetchOrders();
          },
          prefill: {
            name: "example name",
            email: "email@example.com",
            contact: "111111",
          },
          notes: {
            address: "example address",
          },
          theme: {
            color: "#80c0f0",
          },
        };

        setIsLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        // setLoading(false);
      }
    };
    document.body.appendChild(script);
  };
  return (
    <>
      <Navbar />
      {isloading ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h4 className="mb-3">{productName} Details</h4>
                <hr style={{ borderColor: "#b8bfc2" }} />
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li
                      className="breadcrumb-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/collections")}
                    >
                      Home
                    </li>
                    {/* <li className="breadcrumb-item"><a href="{% url 'Collections' products.category.name %}">Collections</a></li> */}
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                      style={{ cursor: "pointer" }}
                    >
                      {productName}
                    </li>
                  </ol>
                </nav>
              </div>

              <div className="col-4 my-3 pic-box">
                <img
                  src={image}
                  className="card-image-top buvi"
                  alt="{{products}}"
                />
              </div>
              <div className="col-8 my-3">
                <h5 className="text-success">{productName}</h5>
                <p>{description}</p>
                <h6 className="my-2 text-danger">
                  Current Price : Rs. <s>{originalPrice}</s>
                </h6>
                <h5 className="my-2 text-primary">
                  Offer Price : Rs.{sellingPrice}
                </h5>
                <div className="my-3">
                  {/* {% if products.quantity > 0 %} */}
                  <div>
                    <div className="input-group" style={{ width: "150px" }}>
                      <button
                        className="input-group-text bg-success text-light"
                        id="btnMinus"
                        onClick={() => handleMinus()}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                      &nbsp;&nbsp;{qty}&nbsp;&nbsp;
                      <button
                        className="input-group-text bg-success text-light"
                        id="btnPlus"
                        onClick={() => handlePlus()}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  {quantity > 0 ? (
                    <div>
                      <button
                        className="btn btn-primary"
                        id="btnCart"
                        onClick={() => handleBtnCart()}
                        style={{ margin: "20px" }}
                      >
                        <i
                          className="fa fa-shopping-cart"
                          style={{ padding: "10px" }}
                        ></i>
                        Add to Cart
                      </button>
                      &nbsp;&nbsp;
                      <button
                        className="btn btn-danger"
                        id="btnFav"
                        onClick={() => handleBtnFav()}
                        style={{ margin: "20px" }}
                      >
                        <i
                          className="fa fa-heart"
                          style={{ padding: "10px" }}
                        ></i>
                        Add to Favourite
                      </button>
                      <div style={{ marginLeft: "100px" }}>
                        <button
                          className="btn btn-warning btn-lg"
                          style={{ padding: " 10px 50px" }}
                          onClick={() => {
                            if (email) {
                              if (qty > 0) {
                                loadRazorpay();
                              } else {
                                toast.error("Please add quantity");
                              }
                            } else {
                              toast.error("Please Login");
                            }
                          }}
                        >
                          <i
                            className="fa fa-cart-plus"
                            aria-hidden="true"
                            style={{ padding: "10px" }}
                          ></i>
                          Buy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      style={{ margin: "20px" }}
                    >
                      <i
                        className="fa fa-minus"
                        style={{ padding: "10px" }}
                      ></i>
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetails;
