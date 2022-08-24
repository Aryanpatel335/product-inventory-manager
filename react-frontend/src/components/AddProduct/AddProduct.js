import React, { useState } from "react";
import { NavBar } from "../NavBar/NavBar";

export const AddProduct = () => {
  const [productname, setProductname] = useState("");
  const [category, setCateogry] = useState("");
  const [saleprice, setSalePrice] = useState("");
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingAdd(true);
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
    }).then(() => {
      setShowMessage(true);
      setLoadingAdd(false);
      setCateogry("");
      setSalePrice("");
      setProductname("");
    });
  };

  return (
    <>
      <NavBar />
      <div className="container text-center">
        <h1 className="mt-3">Add Product to Inventory Database</h1>
        <div className="card col-4 mx-auto mt-5">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label">
                  Product Name
                  <input
                    type="text"
                    value={productname}
                    className="form-control"
                    onChange={(e) => {
                      setProductname(e.target.value);
                      setShowMessage(false);
                    }}
                  />
                </label>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">
                  Category
                  <input
                    type="text"
                    value={category}
                    className="form-control"
                    onChange={(e) => {
                      setCateogry(e.target.value);
                      setShowMessage(false);
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
                    value={saleprice}
                    onChange={(e) => {
                      setSalePrice(e.target.value);
                      setShowMessage(false);
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
            {loadingAdd && (
              <div class="spinner-border text-primary" role="status"></div>
            )}
            {showMessage && (
              <div class="alert alert-success" role="alert">
                Product Successfully Added!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
