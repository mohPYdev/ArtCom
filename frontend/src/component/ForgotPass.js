import "./forgotpass.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
function ForgotPass() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const triggleVisibility = () => {
    document.getElementsByClassName("FG_newpassword_l")[0].style.visibility =
      "visible";
    document.getElementsByClassName("FG_newpassword")[0].style.visibility =
      "visible";
    document.getElementsByClassName(
      "FG_confirmnewpassword_l"
    )[0].style.visibility = "visible";
    document.getElementsByClassName(
      "FG_confirmnewpassword"
    )[0].style.visibility = "visible";

    document.getElementsByClassName("send-email")[0].style.visibility =
      "hidden";
    document.getElementsByClassName("send-pass")[0].style.visibility =
      "visible";

    document.getElementsByClassName("FG_email_l")[0].style.visibility =
      "hidden";
    document.getElementsByClassName("FG_email")[0].style.visibility = "hidden";
  };
  const sendEmail = async () => {
    triggleVisibility();

    const email_url = "http://localhost:8000/auth/users/reset_password/";
    const res = await axios.post(email_url, { email });
    console.log(res);
  };
  const sendPass = () => {};
  const returnHome = () => {
    navigate(`/`);
  };
  return (
    <>
      <div id="forgotpass--page">
        <div id="FG_Form">
          <label className="FG_email_l "> ایمیل</label>
          <input
            className="FG_email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label className="FG_newpassword_l"> رمز عبور جدید</label>
          <input className="FG_newpassword " type="password"></input>
          <label className="FG_confirmnewpassword_l ">
            {" "}
            تکرار رمز عبور جدید
          </label>
          <input className="FG_confirmnewpassword " type="password"></input>

          <button
            type="buttton"
            className="FG_save send-email "
            onClick={sendEmail}
          >
            ثبت
          </button>
          <button
            type="button"
            className="FG_save send-pass "
            onClick={sendPass}
          >
            ثبت
          </button>
          <button type="button" id="FG_back" onClick={returnHome}>
            بازگشت
          </button>
        </div>
      </div>
    </>
  );
}
export default ForgotPass;
