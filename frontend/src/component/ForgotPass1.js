import "./forgotpass.css";
import { useNavigate  , useParams} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAlert } from "react-alert";
import ForgotPass2 from "./ForgotPass2";
function ForgotPass1() {
  let navigate = useNavigate();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const sendEmail = async () => {
    try {
      const email_url = "https://artcom-sjavanmard.fandogh.cloud/auth/users/reset_password/";
      
      const res = await axios.post(email_url, { email });

      if (res.status == 204) {
        alert.success("ایمیل بازیابی رمز عبور با موفقیت ارسال شد");
      }
    } catch (err) {
      alert.error("ایمیل وارد شده در سامانه ثبت نشده است");
    }
  };
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
          <button
            type="buttton"
            className="FG_save send-email "
            onClick={sendEmail}
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
export default ForgotPass1;
