import './OverflowLogin.css'
import brush from '../img/brush.svg';
import { useState } from 'react';
function OverflowLogin(){
  const [username , setUsername] = useState("");
  const [password , setPassword ] = useState("");
  return(
    <>
    <div className="container">
    <img src={brush} className="brush"/>
    </div>
    <form action="#">
    <input type="text" id="username" name="username" value={username} className="item" />
    <label for="username" id="username-label" className="item">نام کاربری</label>
    <input type="text" id="password" name="password" value={password}  className="item"/>
    <label for="password" id="password-label" className="item" >رمز عبور</label>
    <input type="submit" value="login" id="btn-login-form" className="item" />
</form>
    </>
  )
}
export default OverflowLogin;