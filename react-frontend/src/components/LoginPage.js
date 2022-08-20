import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../components/LoginPage.css"


export const LoginPage = () => {
    const navigate = useNavigate();





    return (
    
    <>
        <div>
            <h1>Hello Welcome to Project Inventory Management Application</h1>
            <button onClick={()=> navigate('/home')}>Sign In with Google</button>
        </div>

    
    </>


  )
}
