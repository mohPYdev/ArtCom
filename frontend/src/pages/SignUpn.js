import styles_signupn from './signupnormal.module.css';
import painter from './SignUp/image/painter-holding-paint-roller-4891279-4077630.png';
import puzzle from './SignUp/image/puzzle.png';
function SignUpn(){
    return(
        <>
        < div id={styles_signupn.wrapper}>
        <img id={styles_signupn.image} src={painter} />
        <img id={styles_signupn.puzzle} src={puzzle} />
        <form method="get">
            <input type="text" id={styles_signupn.firstname} classname={styles_signupn.box} name="firstname" placeholder="نام" /><br />
            <input type="text" id={styles_signupn.lastname} classname={styles_signupn.box} name="lastname" placeholder="نام خانوادگی" /><br />
            <input type="email" id={styles_signupn.email} classname={styles_signupn.box} name="email" placeholder="ایمیل" /><br />
            <input type="text" id={styles_signupn.username} classname={styles_signupn.box} name="username" placeholder="نام کاربری" />
            <input type="password" id={styles_signupn.password} classname={styles_signupn.box} name="password" placeholder="رمزعبور" /><br />
            <input type="password" id={styles_signupn.confirmpassword} classname={styles_signupn.box} name="confirmpassword" placeholder="تکرار رمزعبور" /><br />
            <textarea id={styles_signupn.address} classname={styles_signupn.box} name="address" placeholder="آدرس"></textarea>
            <br />
            <input type="number" id={styles_signupn.postalcode} classname={styles_signupn.box} name="postalcode" placeholder="کد پستی" />
            <input type="submit" id={styles_signupn.singup} value="ثبت نام" />
        </form>
        </div>
        </>
    )

}
export default SignUpn;