import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "../NavBar/NavBar.css";
import { logOutUser } from "../../store/authSlice";

export const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logOutUser());
    navigate("/");
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <h1 class="navbar-brand fw-bold">Product Inventory Manager</h1>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-4 ">
            <li class="nav-item">
              <NavLink to="/home" className="btn btn-outline-dark btn-sm">
                Home
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink to="/inventory" className="btn btn-outline-dark btn-sm">
                Inventory
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink to="/add" className="btn btn-outline-success btn-sm">
                Add
              </NavLink>
            </li>
          </ul>
          <form class="d-flex">
            <button
              class="btn btn-outline-danger"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
