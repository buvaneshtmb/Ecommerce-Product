import React, { useState } from "react";
import CollectionCard from "./CollectionCard";

const CollectionList = ({ data }) => {
  let [search, setSearch] = useState("");
  return (
    <>
      {" "}
      <div className="container">
        <div className="parent-div">
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
          {data
            .filter((e) => {
              return search.toLowerCase() === ""
                ? e
                : e.productName.toLowerCase().includes(search) ||
                    e.sellingPrice.toString().includes(search);
            })
            .map((data, i) => {
              return (
                <CollectionCard
                  key={i}
                  id={data._id}
                  image={data.image.url}
                  productName={data.productName}
                  originalPrice={data.originalPrice}
                  sellingPrice={data.sellingPrice}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default CollectionList;
