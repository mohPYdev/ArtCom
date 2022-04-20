import './OverflowLogin.css'
import brush from '../img/brush.svg';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useLogin} from '../hooks/useLogin'
import {useNavigate} from 'react-router-dom'
function OverflowLogin(){

  const [username , setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {login, isPending, error } = useLogin()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
    if (!error){
      navigate('/home')
    }
  }

  useEffect(() => {
    if(error){
      setPassword("")
      setUsername("")
      }
  }, [error])

  return(
    <>
      <div className="login--container">
        <img src={brush} className="brush"/>
      </div>
      <form id="login--form" onSubmit={handleSubmit} >
        <input type="text" id="login--username" name="username" value={username} className="item" onChange={(e)=>setUsername(e.target.value  )} required/>
        <label  id="login--username-label" className="item">نام کاربری</label>
        <input type="password" id="login--password" name="password" value={password}  className="item" onChange={(e)=>setPassword( e.target.value)} />
        <label  id="login--password-label" className="item" >رمز عبور</label>
      
      
        <button id="btn-login-form" className="item" type="submit" onClick={handleSubmit}>ورود </button>
        {/* {isPending && <button disabled className='btn'>Loading ...</button>} */}
        <Link to={'/forgetPassword'}  id="forget-pass-btn"> فراموشی رمز عبور </Link>

      </form>
    </>
  )
}
export default (OverflowLogin);