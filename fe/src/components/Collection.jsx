import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LmsApiService from "../api";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import CollectionList from "./CollectionList";
import Pagination from "./Pagination";
import Loader from "./Loader";

function Collection() {
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [postsPerPage, setPostsPerPage] = useState(4);
  let [isloading, setIsLoading] = useState(false);

  // let [search, setSearch] = useState("");

  console.log(data);

  let getData = async () => {
    try {
      setIsLoading(true);
      let res = await LmsApiService.get("/get-allproduct");
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

  useEffect(() => {
    getData();
  }, []);

  let lastPostIndex = currentPage * postsPerPage;
  let firstPostIndex = lastPostIndex - postsPerPage;
  let currentPosts = data.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Navbar />
      {isloading ? (
        <Loader />
      ) : (
        <>
          <CollectionList data={currentPosts} />
          <Pagination
            totalPosts={data.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
}

export default Collection;
