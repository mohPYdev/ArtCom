import stylesheet from './SignUp/SignUp_Artist.css';
function SignUpa(){
return(
    <>
    <div id="sa_wrapper">
        <form method="get">
            <input type="text" id="sa_firstname" class="sa_box" name="firstname" placeholder="نام" /><br />
            <input type="text" id="sa_lastname" class="sa_box" name="lastname" placeholder="نام خانوادگی" /><br />
            <input type="email" id="sa_email" class="sa_box" name="email" placeholder="ایمیل" /><br />
            <input type="text" id="sa_username" class="sa_box" name="username" placeholder="نام کاربری" />
            <input type="password" id="sa_password" class="sa_box" name="password" placeholder="رمزعبور" /><br />
            <input type="password" id="sa_confirmpassword" class="sa_box" name="confirmpassword" placeholder="تکرار رمزعبور" /><br />
            <input type="text" id="sa_invitationcode" class="sa_box" name="invitationcode" placeholder="کد دعوت" /><br />
            <label id="sa_label" class="sa_box">تخصص:</label>
            <select id="sa_selection" class="sa_box" name="education">
                <option value="painter" selected>نقاش</option>
                <option value="photographer">عکاس</option>
                <option value="Potter">سفالگر</option>
                <option value="Sculptor" >مجسمه ساز</option>
                <option value="Other">سایر</option>
            </select> 
                <textarea id="sa_address" class="sa_box" name="address" placeholder="آدرس"></textarea>
                <br />
                <input type="number" id="sa_postalcode" class="sa_box" name="postalcode" placeholder="کد پستی" />
                <input type="submit" id="sa_singup" value="ثبت نام" />
        </form>
    </div>
    </>
)
}
export default SignUpa;