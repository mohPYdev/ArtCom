import "./forgotpass.css";
function ForgotPass() {
  return (
    <>
      <div id="forgotpass--page">
        <form id="FG_Form">
          <label id="FG_newpassword_l"> رمز عبور جدید</label>
          <input id="FG_newpassword" type="password"></input>
          <br />
          <label id="FG_confirmnewpassword_l"> تکرار رمز عبور جدید</label>
          <input id="FG_confirmnewpassword" type="password"></input>
          <br />
        </form>
        <button type="submit" id="FG_save">
          ثبت
        </button>
        <button type="button" id="FG_back">
          بازگشت
        </button>
      </div>
    </>
  );
}
export default ForgotPass;
