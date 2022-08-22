import React from 'react'

import "../components/LoginPage.css"
import { GoogleLogin} from "@react-oauth/google";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleSignInUser } from '../store/authSlice';


export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const googleSuccess = async (res)=>{
        const data= jwt_decode(res.credential);
        
        //res.credentail is our google token 
      
    
        try{
            const subid = data.sub
            const email = data.email
            const obj = {subid,email}
            await fetch(`/findUser`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }
            ).then(res => res.json())
            .then(body=>{
                console.log(body);
                if (body===true){
                    
                    dispatch(googleSignInUser(data,navigate));
                }
                else{
                    navigate('/')
                }
            })
            

        

        
        }catch(error){
            console.log(error);
        }

    }
    const googleFailure= (error) =>{
        console.log(error);
        console.log('Google Sign Up unsuccessful')
    }

   


    return (
    
    <>
        <div>
            <h1>Hello Welcome to Project Inventory Management Application</h1>
            {/* With Google: <a href="http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/home">click here</a> */}
            {/* <meta http-equiv="refresh" content="URL=http://localhost:8080/oauth2/authorization/google" /> */}
            <div className='googleBtn'>
                                    <GoogleLogin 

                                        onSuccess={googleSuccess}
                                        onFailure={googleFailure}

                                    />
            </div>

        </div>

    
    </>


  )
}
