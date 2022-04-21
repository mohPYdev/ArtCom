import "./Login.css";
import React from "react";
import { Outlet, Link } from "react-router-dom";
import EllipseUp from "../img/Ellipse--up.svg";
import EllipseUp1 from "../img/EllipseUp1.svg";
import EllipseUp2 from "../img/EllipseUp2.svg";
import Ellipse4 from "../img/Ellipse4.svg";
import EllipseDown from "../img/EllipseDown.svg";
import hero from "../img/hero1.svg";
import pinkLine from "../img/pinkLine.svg";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShownSignup: "", isShownLogin: "" };
  }
  loginBtnMouseEnter() {
    const slice = document.getElementById("Ellipse4");
    const pizza = document.getElementById("EllipseDown");
    slice.style.transform = "scale(1.1) ";
    slice.style.transform += "translate(1rem,-2rem)";
    pizza.style.transform = " scale(0.9) ";
    pizza.style.transform += "translate(-1rem,2rem)";
    pizza.style.opacity = 0.7;
  }
  loginBtnMouseLeave() {
    const slice = document.getElementById("Ellipse4");
    const pizza = document.getElementById("EllipseDown");
    slice.style.transform = "scale(1) ";
    // slice.style.transform +="translate(1rem,-2rem)"
    pizza.style.transform = "scale(1) ";
    // pizza.style.transform += "translate(-1rem,2rem)";
    pizza.style.opacity = 1;
  }
  signUpBtnMouseEnter() {
    const slice1 = document.getElementById("EllipseUp1");
    const slice2 = document.getElementById("EllipseUp2");
    const pizza = document.getElementById("EllipseUp");
    slice1.style.transform = "scale(1.1) ";
    slice1.style.transform += "translate(-1rem,2rem)";
    slice2.style.transform = "scale(1.1) ";
    slice2.style.transform += "translate(1rem,-2rem)";
    pizza.style.transform = " scale(0.96) ";
    pizza.style.transform += "translate(-1rem,2rem)";
    pizza.style.opacity = 0.7;
  }
  signUpBtnMouseLeave() {
    const slice1 = document.getElementById("EllipseUp1");
    const slice2 = document.getElementById("EllipseUp2");
    const pizza = document.getElementById("EllipseUp");
    slice1.style.transform = "scale(1) ";
    // slice1.style.transform +="translate(1rem,-2rem)";
    slice2.style.transform = "scale(1) ";
    // slice2.style.transform +="translate(-1rem,2rem)"
    pizza.style.transform = "scale(1) ";
    // pizza.style.transform += "translate(1rem,-2rem)";
    pizza.style.opacity = 1;
  }
  componentDidMount() {}
  componentDidUpdate() {
    if (this.state.isShownSignup) {
      this.signUpBtnMouseEnter();
    } else if (this.state.isShownSignup === false) {
      this.signUpBtnMouseLeave();
    }
    if (this.state.isShownLogin) {
      this.loginBtnMouseEnter();
    } else if (this.state.isShownLogin === false) {
      this.loginBtnMouseLeave();
    }
  }
  render() {
    return (
      <div id="login--page">
        {/* <div id="section-login"> */}

        {/* <img src={brush} className="brush"/> */}

        <div className="login--header">
          <h1>ArtCom</h1> <h5>آرتکام</h5>
        </div>
        {/* <div className='login--header--sub'>
          
        </div> */}

        <div id="pizzaUp">
          <p id="pizzaUp--context">
            {" "}
            اگه توی آرتکام حساب نداری همین الان وقتشه ثبت نام کنی
          </p>

          <img
            src={EllipseUp}
            id="EllipseUp"
            onMouseEnter={() => this.setState({ isShownSignup: true })}
            onMouseLeave={() => this.setState({ isShownSignup: false })}
          />
          <div id="sliceUp">
            <img src={EllipseUp1} id="EllipseUp1" />
            <Link
              to="/signUpa"
              id="btn-signup-a"
              onMouseEnter={() => this.setState({ isShownSignup: true })}
              onMouseLeave={() => this.setState({ isShownSignup: false })}
            >
              ثبت نام هنرمند
            </Link>

            <img src={EllipseUp2} id="EllipseUp2" />
            <Link
              to="/signUpn"
              id="btn-signup-n"
              onMouseEnter={() => this.setState({ isShownSignup: true })}
              onMouseLeave={() => this.setState({ isShownSignup: false })}
            >
              ثبت نام کاربر عادی
            </Link>
          </div>
        </div>

        <div id="pizzaDown">
          <p id="pizzaDown--context">حساب آرتکام داری ؟ پس منتظر چی هستی ؟</p>

          <img
            src={EllipseDown}
            id="EllipseDown"
            onMouseEnter={() => this.setState({ isShownLogin: true })}
            onMouseLeave={() => this.setState({ isShownLogin: false })}
          />

          <img src={Ellipse4} id="Ellipse4" />
          <Link
            to="/overflow"
            id="btn-login"
            onMouseEnter={() => this.setState({ isShownLogin: true })}
            onMouseLeave={() => this.setState({ isShownLogin: false })}
          >
            ورود
          </Link>
        </div>
        <img src={hero} id="hero" />
        <img src={pinkLine} id="line" />
        <Outlet />
        {/* </div> */}
      </div>
    );
  }
}
export default Login;
