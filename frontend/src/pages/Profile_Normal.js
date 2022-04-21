import { React, useEffect, useState } from "react";
import "./profile_theme.css";
import backPic from "../img/Picture.png";
import profilePic from "../img/profile--picture.png";

export default function Profile_Normal() {
  document.body.classList.add("bodyClass_profiless");
  window.onbeforeunload = function (e) {
    document.body.classList.remove("bodyClass_profiless");
  };

  //file button
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(profilePic);
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
  //

  const [Bio_textarea_profiless, set_Bio_textarea_profiless] = useState("");
  const [firstname_text_profiless, set_firstname_text_profiless] = useState("");
  const [lastname_text_profiless, set_lastname_text_profiless] = useState("");
  const [username_text_profiless, set_username_text_profiless] = useState("");
  const [email_input_profiless, set_email_input_profiless] = useState("");
  const [phone_input_profiless, set_phone_input_profiless] = useState("");
  const [Address_textarea_profiless, set_Address_textarea_profiless] =
    useState("");
  const [postalcode_input_profiless, set_postalcode_input_profiless] =
    useState("");

  const changeBioTextarea = (event) => {
    set_Bio_textarea_profiless(event.target.value);
  };
  const changeFirstnameText = (event) => {
    set_firstname_text_profiless(event.target.value);
  };
  const changeLastnameText = (event) => {
    set_lastname_text_profiless(event.target.value);
  };
  const changeUsernameText = (event) => {
    set_username_text_profiless(event.target.value);
  };
  const changeEmailInput = (event) => {
    set_email_input_profiless(event.target.value);
  };
  const changePhoneInput = (event) => {
    set_phone_input_profiless(event.target.value);
  };
  const changeAddressTextarea = (event) => {
    set_Address_textarea_profiless(event.target.value);
  };
  const changePostalcodeInput = (event) => {
    set_postalcode_input_profiless(event.target.value);
  };
  const submitting = (event) => {
    event.preventDefault();
  };

  return (
    <div className="main_profiless">
      <div>
        {/* <!--adding page background image--> */}
        <div id="img_back_profiless">
          <img src={backPic} />
        </div>

        <form
          id="profile-form"
          onSubmit={submitting}
          method="get"
          style={{ zIndex: 10 }}
        >
          {/* <!--adding profile image--> */}
          <div id="img_prof_profiless">
            <img id="profile_image_profiless" src={imageUrl} />
            <label id="img_prof_label_profiless" for="img_prof_btn_profiless">
              +
              <input
                accept="image/*"
                type="file"
                id="img_prof_btn_profiless"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </label>
          </div>

          {/* <!--adding Bio textarea--> */}
          <textarea
            value={Bio_textarea_profiless}
            onChange={changeBioTextarea}
            id="Bio_textarea_profiless"
            name="Bio_textarea"
            cols="18"
            rows="20"
            placeholder="بیوگرافی"
          ></textarea>

          {/* <!--adding first name text--> */}
          <input
            value={firstname_text_profiless}
            onChange={changeFirstnameText}
            type="text"
            className="common_form_profiless"
            id="firstname_text_profiless"
            name="firstname_text"
            placeholder="نام"
          />
          {/* <!--adding last name text--> */}
          <input
            value={lastname_text_profiless}
            onChange={changeLastnameText}
            type="text"
            className="common_form_profiless"
            id="lastname_text_profiless"
            name="lastname_text"
            placeholder="نام خانوادگی"
          />
          {/* <!--adding last name text--> */}
          <input
            value={username_text_profiless}
            onChange={changeUsernameText}
            type="text"
            className="common_form_profiless"
            id="username_text_profiless"
            name="username_text"
            placeholder="نام کاربری"
          />
          {/* <!--adding email input--> */}
          <input
            value={email_input_profiless}
            onChange={changeEmailInput}
            type="email"
            className="common_form_profiless"
            id="email_input_profiless"
            name="email_input"
            placeholder="رایانامه"
          />
          {/* <!--adding phone number input--> */}
          <input
            value={phone_input_profiless}
            onChange={changePhoneInput}
            type="tel"
            className="common_form_profiless"
            id="phone_input_profiless"
            name="phone_input"
            placeholder="تلفن همراه"
          />
          {/* <!--adding address textarea--> */}
          <textarea
            value={Address_textarea_profiless}
            onChange={changeAddressTextarea}
            id="Address_textarea_profiless"
            name="Address_textarea"
            placeholder="آدرس"
          ></textarea>
          {/* <!--adding postal code input--> */}
          <input
            value={postalcode_input_profiless}
            onChange={changePostalcodeInput}
            type="tel"
            className="common_form_profiless"
            id="postalcode_input_profiless"
            name="postalcode_input"
            placeholder="کد پستی"
          />
          {/* <!--adding submit button--> */}
          <input
            type="submit"
            className="common_form_profiless"
            id="submit_input_profiless"
            name="submit_input"
            value="اعمال"
          />
        </form>
      </div>
    </div>
  );
}
