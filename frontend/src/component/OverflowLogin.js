import "./OverflowLogin.css";
import brush from "../img/brush.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
function OverflowLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();
  let navigate = useNavigate();

  const loadHome = () => {
    login(username, password);
  };
  const forgetPass = (e) => {
    e.preventDefault();
    navigate(`/forgotpassword`);
  };

  useEffect(() => {
    if (error) {
      setPassword("");
      setUsername("");
    }
  }, [error]);

  return (
    <>
      <div className="login--container">
        <img src={brush} className="brush" />
      </div>
      <div id="login--form">
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

        <button
          id="btn-login-form"
          className="item"
          type="button"
          onClick={loadHome}
        >
          ورود{" "}
        </button>
        {/* {isPending && <button disabled className='btn'>Loading ...</button>} */}
        {/* {error && <div className='error'>{error}</div>} */}
        <button id="forget-pass-btn" type="button" onClick={forgetPass}>
          {" "}
          فراموشی رمز عبور{" "}
        </button>
      </div>
    </>
  );
}
export default OverflowLogin;
