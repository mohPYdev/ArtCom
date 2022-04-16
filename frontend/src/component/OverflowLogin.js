import './OverflowLogin.css'
import brush from '../img/brush.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'
import {useState} from 'react';
import {useLogin} from '../hooks/useLogin'

function OverflowLogin(){

  const alert = useAlert();
  const [username , setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {login, isPending, error } = useLogin()
  

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
    alert.success("شما با موفقت وارد شدید")
  }

  

  return(
    <>
      <div className="login--container">
        <img src={brush} className="brush"/>
      </div>
      <form id="login--form" onSubmit={handleSubmit}>
        <input type="text" id="login--username" name="username" value={username} className="item" onChange={(e)=>setUsername(e.target.value  )} />
        <label  id="login--username-label" className="item">نام کاربری</label>
        <input type="password" id="login--password" name="password" value={password}  className="item" onChange={(e)=>setPassword( e.target.value)}/>
        <label  id="login--password-label" className="item" >رمز عبور</label>
      
      
        { !isPending && <button id="btn-login-form" className="item" type>ورود </button>}
        {isPending && <button disabled className='btn'>Loading ...</button>}
        {error && <div className='error'>{error}</div>}
        <Link to="/forgotpassword" id="forget-pass-btn" > فراموشی رمز عبور </Link>
      </form>
    </>
  )
}
export default (OverflowLogin);