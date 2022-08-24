import React, { useState } from "react";
import { NavBar } from "../NavBar/NavBar";

export const AddProduct = () => {
  const [productname, setproductname] = useState("");
  const [category, setCateogry] = useState("");
  const [saleprice, setSalePrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pid = Math.floor(Math.random() * 100);
    const productcode = Math.floor(Math.random() * 100);
    const status = "AVAILABLE";
    const addContentObj = {
      pid,
      productcode,
      productname,
      category,
      saleprice,
      status,
    };
    await fetch(`/products`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addContentObj),
    }).then(console.log("product added"));
  };

  return (
    <div>
      <NavBar />
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label">
                Product Name
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setproductname(e.target.value);
                  }}
                />
              </label>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">
                Category
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setCateogry(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="form-outline mb-4">
              <label className="form-label">
                Sale Price
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => {
                    setSalePrice(e.target.value);
                  }}
                  min="0"
                  step="any"
                />
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
