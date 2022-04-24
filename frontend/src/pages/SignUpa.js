import react, { useState } from "react";
import stylesheet from "./SignUp/SignUp_Artist.css";
import { useSignupArtist } from "../hooks/useSignupArtist";

function SignUpa() {
  const { signup, error, isPending } = useSignupArtist();

  const [sa_firstname, setSaFirstname] = useState("");
  const [sa_lastname, setSaLastname] = useState("");
  const [sa_email, setSaEmail] = useState("");
  const [sa_username, setSaUsername] = useState("");
  const [sa_password, setSaPassword] = useState("");
  const [sa_confirmpassword, setSaConfirmpassword] = useState("");
  const [sa_invitationcode, setSaInvitationcode] = useState("");
  const [sa_selectValue, setSaselectValue] = useState("");
  const [sa_address, setSaAddress] = useState("");
  const [sa_city, setSaCity] = useState("");
  const [sa_postalcode, setSaPostalcode] = useState("");

  // handle submit
  const handleSaSubmit = (e) => {
    e.preventDefault();
    signup(
      sa_email,
      sa_password,
      sa_username,
      sa_confirmpassword,
      sa_city,
      sa_address,
      sa_postalcode,
      sa_firstname,
      sa_lastname,
      sa_selectValue,
      sa_invitationcode
    );

    // redirect to login page
  };

  // setting the states
  const handlechangeSaFirstname = (event) => {
    setSaFirstname(event.target.value);
  };
  const handlechangeSaLastname = (event) => {
    setSaLastname(event.target.value);
  };
  const handlechangeSaEmail = (event) => {
    setSaEmail(event.target.value);
  };
  const handlechangeSaUsername = (event) => {
    setSaUsername(event.target.value);
  };
  const handlechangeSaPassword = (event) => {
    setSaPassword(event.target.value);
  };
  const handlechangeSaConfirmpassword = (event) => {
    setSaConfirmpassword(event.target.value);
  };
  const handlechangesasaInvitationcode = (event) => {
    setSaInvitationcode(event.target.value);
  };
  const handlechangesaSelectValue = (event) => {
    console.log("e :" + event.target.value);
    setSaselectValue(event.target.value);
  };
  const handlechangeSaAddress = (event) => {
    setSaAddress(event.target.value);
  };
  const handlechangeSaCity = (event) => {
    setSaCity(event.target.value);
  };
  const handlechangeSaPostalcode = (event) => {
    setSaPostalcode(event.target.value);
  };
  return (
    <>
      <div id="sa_wrapper">
        <form method="get" onSubmit={handleSaSubmit}>
          <input
            value={sa_firstname}
            onChange={handlechangeSaFirstname}
            type="text"
            id="sa_firstname"
            className="sa_box"
            name="firstname"
            placeholder="نام"
            required
          />
          <br />
          <input
            value={sa_lastname}
            onChange={handlechangeSaLastname}
            type="text"
            id="sa_lastname"
            className="sa_box"
            name="lastname"
            placeholder="نام خانوادگی"
            required
          />
          <br />
          <input
            value={sa_email}
            onChange={handlechangeSaEmail}
            type="email"
            id="sa_email"
            className="sa_box"
            name="email"
            placeholder="ایمیل"
            required
          />
          <br />
          <input
            value={sa_username}
            onChange={handlechangeSaUsername}
            type="text"
            id="sa_username"
            className="sa_box"
            name="username"
            placeholder="نام کاربری"
            required
          />
          <input
            value={sa_password}
            onChange={handlechangeSaPassword}
            type="password"
            id="sa_password"
            className="sa_box"
            name="password"
            placeholder="رمزعبور"
            required
          />
          <br />
          <input
            value={sa_confirmpassword}
            onChange={handlechangeSaConfirmpassword}
            type="password"
            id="sa_confirmpassword"
            className="sa_box"
            name="confirmpassword"
            placeholder="تکرار رمزعبور"
            required
          />
          <br />
          <input
            value={sa_invitationcode}
            onChange={handlechangesasaInvitationcode}
            type="text"
            id="sa_invitationcode"
            className="sa_box"
            name="invitationcode"
            placeholder="کد دعوت"
            required
          />
          <br />
          <label id="sa_label" className="sa_box">
            تخصص:
          </label>
          <select
            value={sa_selectValue}
            onChange={handlechangesaSelectValue}
            id="sa_selection"
            className="sa_box"
            name="education"
          >
            <option selected>--</option>
            <option value="painter">نقاش</option>
            <option value="photographer">عکاس</option>
            <option value="Potter">سفالگر</option>
            <option value="Sculptor">مجسمه ساز</option>
            <option value="Other">سایر</option>
          </select>
          <textarea
            value={sa_address}
            onChange={handlechangeSaAddress}
            id="sa_address"
            className="sa_box"
            name="address"
            placeholder="آدرس"
            required
          ></textarea>
          <input
            value={sa_city}
            onChange={handlechangeSaCity}
            type="text"
            id="sa_city"
            className="sa_box"
            name="city"
            placeholder="شهر"
            required
          />
          <br />
          <br />
          <input
            value={sa_postalcode}
            onChange={handlechangeSaPostalcode}
            type="number"
            id="sa_postalcode"
            className="sa_box"
            name="postalcode"
            placeholder="کد پستی"
            required
          />
          <input type="submit" id="sa_singup" value="ثبت نام" />
        </form>
      </div>
    </>
  );
}
export default SignUpa;
