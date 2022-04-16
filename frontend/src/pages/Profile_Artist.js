import React from 'react';
import './profile_theme.css';
import backPic from '../img/Picture.png';
import profilePic from '../img/profile--picture.png';
export default function Profile_Artist() {
  document.body.classList.add('bodyClass_profiless');
  window.onbeforeunload = function (e) {
    document.body.classList.remove('bodyClass_profiless');
  }
  return (
    // <!--a div covering whole page-->
    <div className='main_profiless'>

        {/* <!--adding page background image--> */}
        <div id='img_back_profiless'>
            <img src={backPic}/>
        </div>
        
        <form id="profile-form" action="" method="" autocomplete="" style={{zIndex: 10}}>
            {/* <!--adding profile image--> */}
            <div id='img_prof_profiless'>
                <img src={profilePic}/>
                <button id='img_prof_btn_profiless' onclick="document.getElementById('getFile').click()"> + </button>
                <input type='file' id='getFile_profiless' style={{display:'none'}}/>
            </div>

            {/* <!--adding Bio textarea--> */}
            <textarea id='Bio_textarea_profiless' name="Bio_textarea" cols="18" rows="20" placeholder="بیوگرافی" ></textarea>

            {/* <!--adding first name text--> */}
            <input type="text" className='common_form_profiless' id='firstname_text_profiless' name="firstname_text" placeholder="نام" />
            {/* <!--adding last name text--> */}
            <input type="text" className='common_form_profiless' id='lastname_text_profiless' name="lastname_text" placeholder="نام خانوادگی" />
            {/* <!--adding last name text--> */}
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
            <input type="submit" className='common_form_profiless' id='submit_input_profiless' name="submit_input" value="اعمال" />

        </form>

        {/* <!--adding invitation codes textarea--> */}
        <textarea id='invitation_codes_textarea_profiless' name="invitation_codes_textarea" placeholder="کدهای دعوت" readonly ></textarea>

    </div>
  )
}
