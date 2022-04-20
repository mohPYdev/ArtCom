import {React , useEffect} from 'react';
import './profile_theme.css';
import backPic from '../img/Picture.png';
import profilePic from '../img/profile--picture.png';
import { useState } from 'react';
import {Prompt} from 'react-router';


export default function Profile_Normal() {
  document.body.classList.add('bodyClass_profiless');
  window.onbeforeunload = function (e) {
    document.body.classList.remove('bodyClass_profiless');
  }

  const [ProfilePicture, setProfilePicture] = useState(document.getElementById("profile_picture_profiless").src);
  const [Bio, setBio] = useState(document.getElementById("Bio_textarea_profiless").value);
  const [Firstname, setFirstname] = useState(document.getElementById("firstname_text_profiless").value);
  const [Lastname, setLastname] = useState(document.getElementById("lastname_text_profiless").value);
  const [Username, setUsername] = useState(document.getElementById("username_text_profiless").value);
  const [Email, setEmail] = useState(document.getElementById("email_input_profiless").value);
  const [Phone, setPhone] = useState(document.getElementById("phone_input_profiless").value);
  const [Address, setAddress] = useState(document.getElementById("Address_textarea_profiless").value);
  const [PostalCode, setPostalCode] = useState(document.getElementById("postalcode_input_profiless").value);
  //to do: recieve info from back
  const submit_form = () => {
    setProfilePicture(document.getElementById("profile_picture_profiless").src);
    setBio(document.getElementById("Bio_textarea_profiless").value);
    setFirstname(document.getElementById("firstname_text_profiless").value);
    setLastname(document.getElementById("lastname_text_profiless").value)
    setUsername(document.getElementById("username_text_profiless").value)
    setEmail(document.getElementById("email_input_profiless").value)
    setPhone(document.getElementById("phone_input_profiless").value)
    setAddress(document.getElementById("Address_textarea_profiless").value)
    setPostalCode(document.getElementById("postalcode_input_profiless").value)
    //to do: send info to back
  }

  return (
    <div className='main_profiless'>
        <div>

        {/* <!--adding page background image--> */}
        <div id='img_back_profiless'>
            <img src={backPic} alt="background" />
        </div>

        <form style={{zIndex: 10}}>
            {/* <!--adding profile image--> */}
            <div id='img_prof_profiless'>
                <img src={profilePic} alt="propic" />
                <button id='img_prof_btn_profiless' onclick="document.getElementById('getFile').click()"> + </button>
                <input type='file' id='getFile_profiless' style={{display:'none'}}/>
            </div>

            {/* <!--adding Bio textarea--> */}
            <textarea id='Bio_textarea_profiless' name="Bio_textarea" cols="18" rows="20" placeholder="بیوگرافی" ></textarea>

            {/* <!--adding first name text--> */}
            <input type="text" className='common_form_profiless' id='firstname_text_profiless' name="firstname_text" placeholder="نام" />
            {/* <!--adding last name text--> */}
            <input type="text" className='common_form_profiless' id='lastname_text_profiless' name="lastname_text" placeholder="نام خانوادگی" />
            {/* <!--adding username text--> */}
            <input type="text" className='common_form_profiless' id='username_text_profiless' name="username_text" placeholder="نام کاربری" />
            {/* <!--adding email input--> */}
            <input type="email" className='common_form_profiless' id='email_input_profiless' name="email_input" placeholder="رایانامه" />
            {/* <!--adding phone number input--> */}
            <input type="tel" className='common_form_profiless' id='phone_input_profiless' name="phone_input" placeholder="تلفن همراه" />
            {/* <!--adding address textarea--> */}
            <textarea id='Address_textarea_profiless' name="Address_textarea" placeholder="آدرس" ></textarea>
            {/* <!--adding postal code input--> */}
            <input type="tel" className='common_form_profiless' id='postalcode_input_profiless' name="postalcode_input" placeholder="کد پستی" />
            {/* <!--adding submit button--> */}
            <input type="submit" onClick={submit_form} className='common_form_profiless' id='submit_input_profiless' name="submit_input" value="اعمال" />

        </form>

        </div>
    </div>
  )
}
