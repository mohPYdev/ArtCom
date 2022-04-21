<<<<<<< HEAD
import './OverflowLogin.css'
import brush from '../img/brush.svg';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useLogin} from '../hooks/useLogin'
function OverflowLogin(){

  const [username , setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {login, isPending, error } = useLogin()
  const [forget , setForget] = useState("");
  
const loadHome =()=>{
  login(username, password)
  
}
  const handleSubmit = (e) => {
   e.preventDefault()
   console.log(1);
  //  <Link to="/forgotpassword" className='forget-link'>ارسال رمزعبور به ایمیل ثبت شده با این نام کاربری</Link>


  }

  useEffect(() => {
    if(error){
      setPassword("")
      setUsername("")
      }
  }, [error])
=======
import "./OverflowLogin.css";
import brush from "../img/brush.svg";
import React from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function OverflowLogin() {
  const alert = useAlert();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };
>>>>>>> Frontend

  return (
    <>
      <div className="login--container">
        <img src={brush} className="brush" />
      </div>
<<<<<<< HEAD
      <form id="login--form" onSubmit={handleSubmit} >
        <input type="text" id="login--username" name="username" value={username} className="item" onChange={(e)=>setUsername(e.target.value  )} required/>
        <label  id="login--username-label" className="item">نام کاربری</label>
        <input type="password" id="login--password" name="password" value={password}  className="item" onChange={(e)=>setPassword( e.target.value)} />
        <label  id="login--password-label" className="item" >رمز عبور</label>
      
      
        <button id="btn-login-form" className="item" type="button" onClick={loadHome}>ورود </button>
        {/* {isPending && <button disabled className='btn'>Loading ...</button>} */}
        {/* {error && <div className='error'>{error}</div>} */}
        <button  id="forget-pass-btn" type="submit" > فراموشی رمز عبور </button>

=======
      <form id="login--form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="login--username"
          name="username"
          value={username}
          className="item"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label id="login--username-label" className="item">
          نام کاربری
        </label>
        <input
          type="password"
          id="login--password"
          name="password"
          value={password}
          className="item"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label id="login--password-label" className="item">
          رمز عبور
        </label>

        {
          <button id="btn-login-form" className="item" type>
            ورود{" "}
          </button>
        }
        {/* {isPending && <button disabled className='btn'>Loading ...</button>} */}
        {/* {error && <div className='error'>{error}</div>} */}
        <Link to="/forgotpassword" id="forget-pass-btn">
          {" "}
          فراموشی رمز عبور{" "}
        </Link>
>>>>>>> Frontend
      </form>
    </>
  );
}
export default OverflowLogin;
