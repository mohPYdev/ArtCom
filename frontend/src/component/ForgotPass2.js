import "./forgotpass.css";
import { useNavigate  , useParams} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAlert } from "react-alert";
function ForgotPass2() {
  let navigate = useNavigate();
  const { uid , token } = useParams();
  const alert = useAlert();
  const [newpass , setNewpass] = useState("");
  const [newpass2 , setNewpass2] = useState("");
 

  const sendPass = async() => {
      if(newpass == newpass2 ){

          const resetpass_url ="http://artcom-sjavanmard.fandogh.cloud/auth/users/reset_password_confirm/"
          try{
              const res = await axios.post(resetpass_url , {uid , token , 'new_password':newpass } );
              if(res.status == 204)
              alert.success("رمز شما با موفقیت تغییر کرد")
              navigate(`/login`);

          }
          catch(err){

          }
      }
      else{
          alert.error("تکرار رمز عبور صحیح نمی باشد ")
      }

  };
  const returnHome = () => {
    navigate(`/`);
  };
  return (
    <>
      <div id="forgotpass--page">
        <div id="FG_Form">
          <label className="FG_newpassword_l"> رمز عبور جدید</label>
          <input className="FG_newpassword " type="password" value={newpass} onChange={(e)=>setNewpass(e.target.value)}></input>
          <label className="FG_confirmnewpassword_l ">
            {" "}
            تکرار رمز عبور جدید
          </label>
          <input className="FG_confirmnewpassword " type="password" value={newpass2} onChange={(e)=>setNewpass2(e.target.value)}></input>

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
export default ForgotPass2;
