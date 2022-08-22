import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate} from "react-router-dom";
import '../components/NavBar.css'
import { logOutUser } from '../store/authSlice';

export const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () =>{
    dispatch(logOutUser());
    navigate('/');
  }

  return (
    <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <h1 class="navbar-brand" >Product Inventory Manager</h1>
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
        <li class="nav-item">
          {/* <form onSubmit={handleLogout}>
            <input type="submit" value="Log Out"/>
          </form> */}
          
          <button className='btn btn-danger' onClick = {() => handleLogout()}>Logout</button>
        </li>
        
        
      </ul>
    </div>
  </div>
</nav>
  )
}
