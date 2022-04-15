import React from 'react';
import ps from './profile_theme.module.css';
import backPic from '../img/Picture.png';
import profilePic from '../img/profile--picture.png';

export default function Profile_Artist() {
    document.body.classList.add(ps.bodyClass);
  return (
    // <!--a div covering whole page-->
    <div className={ps.main}>

        {/* <!--adding page background image--> */}
        <div id={ps.img_back}>
            <img src={backPic}/>
        </div>
        
        <form action="" method="" autocomplete="" style={{zIndex: 10}}>
            {/* <!--adding profile image--> */}
            <div id={ps.img_prof}>
                <img src={profilePic}/>
                <button id={ps.img_prof_btn} onclick="document.getElementById('getFile').click()"> + </button>
                <input type='file' id={ps.getFile} style={{display:'none'}}/>
            </div>

            {/* <!--adding Bio textarea--> */}
            <textarea id={ps.Bio_textarea} name="Bio_textarea" cols="18" rows="20" placeholder="بیوگرافی" ></textarea>

            {/* <!--adding first name text--> */}
            <input type="text" className={ps.common_form} id={ps.firstname_text} name="firstname_text" placeholder="نام" />
            {/* <!--adding last name text--> */}
            <input type="text" className={ps.common_form} id={ps.lastname_text} name="lastname_text" placeholder="نام خانوادگی" />
            {/* <!--adding last name text--> */}
            <input type="text" className={ps.common_form} id={ps.username_text} name="username_text" placeholder="نام کاربری" />
            {/* <!--adding email input--> */}
            <input type="email" className={ps.common_form} id={ps.email_input} name="email_input" placeholder="رایانامه" />
            {/* <!--adding phone number input--> */}
            <input type="tel" className={ps.common_form} id={ps.phone_input} name="phone_input" placeholder="تلفن همراه" />
            {/* <!--adding address textarea--> */}
            <textarea id={ps.Address_textarea} name="Address_textarea" placeholder="آدرس" ></textarea>
            {/* <!--adding postal code input--> */}
            <input type="tel" className={ps.common_form} id={ps.postalcode_input} name="postalcode_input" placeholder="کد پستی" />
            {/* <!--adding submit button--> */}
            <input type="submit" className={ps.common_form} id={ps.submit_input} name="submit_input" value="اعمال" />

        </form>

        {/* <!--adding invitation codes textarea--> */}
        <textarea id={ps.invitation_codes_textarea} name="invitation_codes_textarea" placeholder="کدهای دعوت" readonly ></textarea>

    </div>
  )
}
