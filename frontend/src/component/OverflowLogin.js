import './OverflowLogin.css'
import brush from '../img/brush.svg';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'
import {useState} from 'react';
function OverflowLogin(){

  const alert = useAlert();
const [username , setUsername] = useState("");
const [password, setPassword] = useState("");
  
  
 function Login(){
     
    console.log(username);
    console.log(password);
const data1 ={
username :username ,
password :password
}
console.log(data1);
    async function fetchData(){
     
      const options = {
        headers: {'Content-Type': 'application/json'}
      };
      try{
      const res = await axios.post('http://localhost:8000/auth/token/login/', data1,options);
      console.log("fetching");
      if(res.status == 200){
      console.log("logged in successfully!");
      localStorage.setItem('user' , JSON.stringify(res.data));
      alert.success('با موفقیت وارد شدید');
      }
    }
    catch(err){
      alert.error('رمزعبور یا نام کاربری اشتباه می باشد');
      console.log("logged in failed");
      console.log(err);
    }

    }
    fetchData();
   
   
  }
  return(
    <>
    <div className="login--container">
    <img src={brush} className="brush"/>
    </div>
    <form id="login--form" >
    <input type="text" id="login--username" name="username" value={username} className="item" onChange={(e)=>setUsername(e.target.value  )} />
    <label  id="login--username-label" className="item">نام کاربری</label>
     <input type="password" id="login--password" name="password" value={password}  className="item" onChange={(e)=>setPassword( e.target.value)}/>
    <label  id="login--password-label" className="item" >رمز عبور</label>
   
  
    <Link to="#"  id="btn-login-form" className="item"  onClick={Login}>ورود</Link>

    <Link to="/forgotpassword" id="forget-pass-btn" > فراموشی رمز عبور </Link>
</form>
    </>
  )
}
export default (OverflowLogin);