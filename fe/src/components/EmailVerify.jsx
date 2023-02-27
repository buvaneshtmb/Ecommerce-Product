import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LmsApiService from "../api";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  let params = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        let res = await LmsApiService.get(
          `/users/${params.id}/verify/${params.token}`
        );
        console.log(res.data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [params]);
  return (
    <>
      {validUrl ? (
        <div className="container">
          <h1>Email Verified Succefully</h1>
        </div>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
};

export default EmailVerify;
