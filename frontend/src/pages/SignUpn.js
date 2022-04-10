import stylesheet from './signupnormal.module.css';
import painter from './SignUp/image/painter-holding-paint-roller-4891279-4077630.png';
import puzzle from './SignUp/image/puzzle.png';
function SignUpn(){
    return(
        <>
        < div id={stylesheet.wrapper}>
        <img id={stylesheet.image} src={painter} />
        <img id={stylesheet.puzzle} src={puzzle} />
        <form id={stylesheet.froms} method="get">
            <input type="text" id={stylesheet.firstname} classname={stylesheet.box} name="firstname" placeholder="نام" /><br />
            <input type="text" id={stylesheet.lastname} classname={stylesheet.box} name="lastname" placeholder="نام خانوادگی" /><br />
            <input type="email" id={stylesheet.email} classname={stylesheet.box} name="email" placeholder="ایمیل" /><br />
            <input type="text" id={stylesheet.username} classname={stylesheet.box} name="username" placeholder="نام کاربری" />
            <input type="password" id={stylesheet.password} classname={stylesheet.box} name="password" placeholder="رمزعبور" /><br />
            <input type="password" id={stylesheet.confirmpassword} classname={stylesheet.box} name="confirmpassword" placeholder="تکرار رمزعبور" /><br />
            <textarea id={stylesheet.address} classname={stylesheet.box} name="address" placeholder="آدرس"></textarea>
            <br />
            <input type="number" id={stylesheet.postalcode} classname={stylesheet.box} name="postalcode" placeholder="کد پستی" />
            <input type="submit" id={stylesheet.singup} value="ثبت نام" />
        </form>
        </div>
        </>
    )

}
export default SignUpn;