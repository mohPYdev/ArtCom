import React from "react";
import contactus from "../img/Chatters_by_Lollapop___Shutterstock-removebg-preview.png";
import logo from "../img/logo-removebg-preview.png";
import "./Contact_us.css";
export default function Contact_us() {
    return (
        <>
            <div id="contact_wrapper">
                <div id="contact_img">
                    <img id="comment_img" src={contactus}></img>
                    <img id="logo" src={logo}></img>
                </div>
                <div id="contact_title">
                    ارتباط با ما
                </div>
                <div id="contact_text">
                با تشکر از حضور گرم شما در جمع صمیمانه خانواده آرت کام و ابراز امیدواری از رضایتمندی شما دوست عزیز از سامانه ویژه جامعه هنری، به استحضار میرساند:
 تیم شش نفره آرت کام متشکل از دانشجویان مهندسی کامپیوتر دانشگاه اصفهان در زمستان-بهار 400-401 با هدف دسترسی آسان هنرمندان به برگزاری نمایشگاه و مزایده آثار هنری، در بستر فضای مجازی پروژه خود را رقم زد. 
 امید است با همیاری شما کاربران گرامی، مجموعه آرت کام دیده شده و کمکی به جامعه هنری باشد.<br /> راه ارتباطی با ما: <span id="contact_email">ArtCom_support@gmail.com</span>
                </div>
            </div>
        </>
        

    );
}  