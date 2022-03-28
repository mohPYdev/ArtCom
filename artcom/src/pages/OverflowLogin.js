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
    <input type="text" id="username" name="username" value={username} className="center"/>
    <label for="username" id="username-label" className="center">نام کاربری</label><br/>
    <input type="text" id="password" name="password" value={password} className="center"/>
    <label for="password" id="password-label" className="center" >رمز عبور</label><br/>
    <input type="submit" value="login" id="btn-login-form" className="center" />
</form>
    </>
  )
}
export default OverflowLogin;