import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import lghome from "../img/icons8-home-30.png"
import './OverflowLogin.css'
import { useAxios } from '../hooks/useAxios';


export default function BackToHomePost({sold, orderId}) {

    const navigate = useNavigate()


    const fetchData = () =>  {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
        }
    
        fetch(`https://artcom-sjavanmard.fandogh.cloud/post/orders/${orderId}/`, {headers: headers, method:'DELETE', keepalive:true} )
        .then((response) => response.json())
        .then(newpost => {
            console.log("leaving page")
        })


        fetch(`https://artcom-sjavanmard.fandogh.cloud/auth/users/remove/wallet/`,  {body: JSON.stringify({'wallet': 30000}) ,headers: headers, method:'POST', keepalive:true})
        .then((response) => response.json())
        .then(newpost => {
            console.log("leaving page")
        })
    }

    const handleClick = () => {

        if (!sold){
            fetchData();
        }

        navigate("/home")
        
    }

  return (
    <button onClick={handleClick}><span><img id="lg_home" src={lghome} /></span></button>
  )
}
