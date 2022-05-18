
import './OverflowLogin.css'
import brush from '../img/brush.svg';
import lghome from "../img/icons8-home-30.png"
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useLogin} from '../hooks/useLogin'
import axios from 'axios'





function OverflowLogin(){

  const [username , setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {login, isPending, error } = useLogin()

  console.log(console.log(axios.defaults.headers.common['Authorization']))

  const handleSubmit = async(e) => {
    e.preventDefault()
    await login(username, password)

  }

  
  useEffect(() => {
    if(error){
      setPassword("")
      setUsername("")
      }
  }, [error]);


  return (
    <>
      <div className="login--container">
      <Link to="/"><span><img id="lg_home" src={lghome} /></span></Link>
        <img src={brush} className="brush" />
      </div>
      <form id="login--form" onSubmit={handleSubmit} >
        <input type="text" id="login--username" name="username" value={username} className="item" onChange={(e)=>setUsername(e.target.value  )} required/>
        <label  id="login--username-label" className="item">نام کاربری</label>
        <input type="password" id="login--password" name="password" value={password}  className="item" onChange={(e)=>setPassword( e.target.value)} autoComplete='on'/>
        <label  id="login--password-label" className="item" >رمز عبور</label>
      
      
        <button id="btn-login-form" className="item" type="submit" onClick={handleSubmit}>ورود </button>
        <Link to={'/forgotpassword'}  id="forget-pass-btn"> فراموشی رمز عبور </Link>
      </form>
    </>
  );
}
export default OverflowLogin;
