import React from "react";
import { useNavigate } from "react-router-dom";

function CollectionCard({id,image,productName,originalPrice,sellingPrice,key}) {
    let navigate = useNavigate();

  return (
    <>
            <div key={key} 
              className="card my-3"
              onClick={() => navigate(`/productdetails/${id}`)}
            >
              <img
                src={image}
                className="card-image-top buvi"
                alt="Categories"
              />
              <div className="card-body">
                <h5 className="card-title text-primary">{productName}</h5>
                <p className="card-text">
                  <span className="float-start old_price">
                    <s>Rs.{originalPrice}</s>
                  </span>
                  <span className="float-end new_price">
                    Rs.{sellingPrice}
                  </span>
                </p>
              </div>
            </div>
    </>
  );
}

export default CollectionCard;
