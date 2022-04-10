import './SignUp/SignUp_Normal.css'
import painter from './SignUp/image/painter-holding-paint-roller-4891279-4077630.png';
import puzzle from './SignUp/image/puzzle.png';
function SignUpn(){
    return(
        <>
        < div id="wrapper">
        <img id="image" src={painter} />
        <img id="puzzle" src={puzzle} />
        <form method="get">
            <input type="text" id="firstname" class="box" name="firstname" placeholder="نام" /><br />
            <input type="text" id="lastname" class="box" name="lastname" placeholder="نام خانوادگی" /><br />
            <input type="email" id="email" class="box" name="email" placeholder="ایمیل" /><br />
            <input type="text" id="username" class="box" name="username" placeholder="نام کاربری" />
            <input type="password" id="password" class="box" name="password" placeholder="رمزعبور" /><br />
            <input type="password" id="confirmpassword" class="box" name="confirmpassword" placeholder="تکرار رمزعبور" /><br />
            <textarea id="address" class="box" name="address" placeholder="آدرس"></textarea>
            <br />
            <input type="number" id="postalcode" class="box" name="postalcode" placeholder="کد پستی" />
            <input type="submit" id="singup" value="ثبت نام" />
        </form>
        </div>
        </>
    )

}
export default SignUpn;