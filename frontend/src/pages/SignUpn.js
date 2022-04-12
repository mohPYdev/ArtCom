import stylesheet from './SignUp/SignUp_Normal.css';
import painter from './SignUp/image/painter-holding-paint-roller-4891279-4077630.png';
import puzzle from './SignUp/image/puzzle.png';
function SignUpn(){
    return(
        <>
        <div id="sn_wrapper">
            <img id="sn_image" src={painter}/>
            <img id="sn_puzzle" src={puzzle}/>
            <form method="get">
                <input type="text" id="sn_firstname" class="sn_box" name="firstname" placeholder="نام" /><br />
                <input type="text" id="sn_lastname" class="sn_box" name="lastname" placeholder="نام خانوادگی" /><br />
                <input type="email" id="sn_email" class="sn_box" name="email" placeholder="ایمیل" /><br />
                <input type="text" id="sn_username" class="sn_box" name="username" placeholder="نام کاربری" />
                <input type="password" id="sn_password" class="sn_box" name="password" placeholder="رمزعبور" /><br />
                <input type="password" id="sn_confirmpassword" class="sn_box" name="confirmpassword" placeholder="تکرار رمزعبور" /><br />
                <textarea id="sn_address" class="sn_box" name="address" placeholder="آدرس"></textarea>
                <br />
                <input type="number" id="sn_postalcode" class="sn_box" name="postalcode" placeholder="کد پستی" />
                <input type="submit" id="sn_singup" value="ثبت نام" />
            </form>
        </div>
        </>
    )

}
export default SignUpn;