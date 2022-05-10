import { React, useEffect, useState } from "react";
import "./profile_theme.css";
import backPic from "../img/Picture.png";
import profilePic from "../img/profile--picture.png";
import {useAuthContext} from '../hooks/useAuthContext';
import {useAxios} from '../hooks/useAxios';
import { useAlert } from 'react-alert'

import axios from 'axios';


export default function Profile_Artist() {
  document.body.className = '';
  document.body.classList.add("bodyClass_profiless");
  window.onbeforeunload = function (e) {
    document.body.classList.remove("bodyClass_profiless");
  };

  const {user , dispatch} = useAuthContext()
  const { data, isPending, error } = useAxios('http://localhost:8000/auth/me/token/');
  const alert = useAlert()

  //file button
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(profilePic);
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
      console.log(selectedImage)
    }
  }, [selectedImage]);
  //

  const [Bio_textarea_profiless, set_Bio_textarea_profiless] = useState("");
  const [firstname_text_profiless, set_firstname_text_profiless] = useState();
  const [lastname_text_profiless, set_lastname_text_profiless] = useState();
  const [username_text_profiless, set_username_text_profiless] = useState();
  const [email_input_profiless, set_email_input_profiless] = useState();
  const [city_input_profiless, set_city_input_profiless] = useState("");
  const [Address_textarea_profiless, set_Address_textarea_profiless] =useState();
  const [postalcode_input_profiless, set_postalcode_input_profiless] =useState();
  const [inviteToken, setInviteToken] = useState("");


  useEffect(() => {
    if (user){
      set_Bio_textarea_profiless(user.artist.description);
      set_firstname_text_profiless(user.first_name);
      set_lastname_text_profiless(user.last_name);
      set_username_text_profiless(user.username);
      set_email_input_profiless(user.email);
      set_Address_textarea_profiless(user.address);
      set_city_input_profiless(user.city);
      set_postalcode_input_profiless(user.postal_code);
      setImageUrl(user.image);
    }
  },[user]);

  useEffect(() => {
    if (data){
      let invite = ""
      data.map(item => {
         invite += item.token + "\n"
      })
      setInviteToken(invite)
    }

  },[data])

  console.log(inviteToken)

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
  const changecityInput = (event) => {
    set_city_input_profiless(event.target.value);
  };
  const changeAddressTextarea = (event) => {
    set_Address_textarea_profiless(event.target.value);
  };
  const changePostalcodeInput = (event) => {
    set_postalcode_input_profiless(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedImage)

    let form_data = new FormData();
    if (selectedImage){form_data.append("image", selectedImage);}
    
    form_data.append("artist.description", Bio_textarea_profiless);
    form_data.append("first_name", firstname_text_profiless);
    form_data.append("last_name", lastname_text_profiless);
    form_data.append("username", username_text_profiless);
    form_data.append("email", email_input_profiless);
    form_data.append('city', city_input_profiless)
    form_data.append("address", Address_textarea_profiless);
    form_data.append("postal_code", postalcode_input_profiless);

    let url = 'http://localhost:8000/auth/users/me/';
    axios.patch(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          dispatch({ type: 'LOGIN', payload: res.data })
          localStorage.setItem('user', JSON.stringify(res.data))
          alert.success('اطلاعات با موفقیت بروزرسانی شد')
        })
        .catch(err => console.log(err))
  };
  useEffect(()=>{
    

  },[selectedImage])


  return (
    // <!--a div covering whole page-->
    <div className="main_profiless">
      {/* <!--adding page background image--> */}
      <div id="img_back_profiless">
        <img src={backPic} />
      </div>

      <form
        id="profile-form"
        onSubmit={handleSubmit}
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
          value={city_input_profiless}
          onChange={changecityInput}
          type="tel"
          className="common_form_profiless"
          id="phone_input_profiless"
          name="phone_input"
          placeholder="شهر"
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

      {/* <!--adding invitation codes textarea--> */}
      <textarea
        id="invitation_codes_textarea_profiless"
        name="invitation_codes_textarea"
        placeholder="کدهای دعوت"
        readonly
        value={inviteToken}
        
      ></textarea>
    </div>
  );
}
