import React from 'react'
import { NavLink} from "react-router-dom";
import '../components/NavBar.css'
export const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <h1 class="navbar-brand" >Product Inventory Notifier</h1>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
            <NavLink to="/home">Home</NavLink>
        </li>
        <li class="nav-item">
            <NavLink to="/inventory">Inventory</NavLink>
        </li>
        
        
      </ul>
    </div>
  </div>
</nav>
  )
}
