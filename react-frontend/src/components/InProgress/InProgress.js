import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import { userLoginStatusSelector } from "../../store/authSlice";
import { useSelector } from "react-redux";

export const InProgress = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  //for complete order load spinner
  const [completeSpinner, setCompleteSpinner] = useState(false);
  const [clickProductId, setClickedProductId] = useState("");
  const loginStatus = useSelector(userLoginStatusSelector);
  const navigate = useNavigate("/");
  useEffect(() => {
    if (!loginStatus) {
      navigate("/");
    }

    setLoading(true);
    fetch("/products")
      .then((response) => response.json())
      .then((body) => {
        const tempArray = body._embedded.productList.filter(
          (objProduct) => objProduct.status === "ORDER_IN_PROGRESS"
        );

        setGroups(tempArray);
        //setGroups(body)
        setLoading(false);
      });
  }, [loginStatus, navigate]);

  // if (loading) {
  //   return (<div class="spinner-border text-primary" role="status">

  // </div>)
  // }
  const handleClick = async (e, product) => {
    setClickedProductId(product.id);
    await fetch(`/products/${product.id}/complete`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(setCompleteSpinner(true));
    fetch("/products")
      .then((response) => response.json())
      .then((body) => {
        const tempArray = body._embedded.productList.filter(
          (objProduct) => objProduct.status === "ORDER_IN_PROGRESS"
        );

        setGroups(tempArray);
        setCompleteSpinner(false);
        //setGroups(body)
        setLoading(false);
      });
  };
  return (
    <div className="App">
      <NavBar />
      <h1 className="mb-4">Orders in Progress</h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>

            <th scope="col">Product Name</th>
            <th scope="col">Category</th>
            <th scope="col">Sale Price</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <tr key={g.id}>
              <th scope="row">{g.id}</th>

              <td>{g.productname}</td>
              <td>{g.category}</td>

              <td>{g.saleprice}</td>
              <td>{g.status}</td>
              {/* <td><button id="Complete" class="bg-success" onClick={(e)=>handleClick(e,g) }>Complete</button> */}
              <td>
                {completeSpinner && g.id === clickProductId ? (
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  ></div>
                ) : (
                  <>
                    <button
                      id="Complete"
                      className="btn"
                      style={{ "background-color": "#51b84d" }}
                      onClick={(e) => handleClick(e, g)}
                    >
                      Complete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {groups.length === 0 && (
        <h4 class="text-warning">No Orders in Progress</h4>
      )}
      {loading && <div class="spinner-border text-primary" role="status"></div>}
    </div>
  );
};
