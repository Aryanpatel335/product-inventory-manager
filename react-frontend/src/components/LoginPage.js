import React from "react";

import "../components/LoginPage.css";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { googleSignInUser } from "../store/authSlice";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleSuccess = async (res) => {
    const data = jwt_decode(res.credential);

    //res.credentail is our google token

    try {
      const subid = data.sub;
      const email = data.email;
      const obj = { subid, email };
      await fetch(`/findUser`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((body) => {
          if (body === true) {
            dispatch(googleSignInUser(data, navigate));
          } else {
            navigate("/");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign Up unsuccessful");
  };

  return (
    <div className="container">
      <section className="row">
        <div className="col-8">
          <div className="px-4 py-5 px-md-5 text-center text-lg-start">
            <div className="container">
              <div className="row gx-lg-5 align-items-center">
                <div className="col-lg-12 mb-5 mb-lg-0">
                  <h1 className="my-5 display-2 fw-bold">
                    Product Inventory Manager <br />
                    <span className="text-success display-5 fw-normal fst-italic">
                      <u>for your business</u>
                    </span>
                  </h1>
                  <p>
                    This web app allows users to interact with company database
                    of over 3000 products. It allows them to add orders for
                    products low in stock as well as complete the orders once
                    product is back in stock. Additionally the user can edit the
                    product details which will also be updated in the connected
                    database. This application allows access to only those in
                    the user database so that product information can not be
                    altered by everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-4 my-auto ">
          <div className="card text-center ">
            <div class="card-header fw-bold">
              <h4>Sign in:</h4>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-center">
                <GoogleLogin
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
