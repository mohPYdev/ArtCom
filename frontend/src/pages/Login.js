import './Login.css';
import React from 'react';
import { Outlet, Link } from "react-router-dom";
import EllipseUp from '../img/Ellipse--up.svg';
import EllipseUp1 from '../img/EllipseUp1.svg';
import EllipseUp2 from '../img/EllipseUp2.svg';
import Ellipse4 from '../img/Ellipse4.svg';
import EllipseDown from '../img/EllipseDown.svg';
import hero from '../img/hero1.svg';
import pinkLine from '../img/pinkLine.svg';
let visitedsignUp = false ;
let visitedlogin = false ;
class Login extends React.Component{
    constructor(props){
        super(props);
        
    }
    loginBtn(){
        if(!visitedlogin){
        const slice = document.getElementById("Ellipse4");
        const pizza = document.getElementById("EllipseDown");
        slice.style.transform = "scale(1.1) ";
        slice.style.transform +="translate(1rem,-2rem)"
        pizza.style.transform = "transform: scale(0.9) ";
        pizza.style.transform += "translate(-1rem,2rem)";
        pizza.style.opacity= 0.7;
        visitedlogin=true;
        }
    }
    signUpBtn(){
        if(!visitedsignUp ){
const slice1=document.getElementById("EllipseUp1");
const slice2=document.getElementById("EllipseUp2");
const pizza=document.getElementById("EllipseUp");
slice1.style.transform = "scale(1.1) ";
        slice1.style.transform +="translate(-1rem,2rem)";
        slice2.style.transform = "scale(1.1) ";
        slice2.style.transform +="translate(1rem,-2rem)"
        pizza.style.transform = "transform: scale(0.96) ";
        pizza.style.transform += "translate(-1rem,2rem)";
        pizza.style.opacity= 0.7;
        visitedsignUp  = true ;
        }



    }
    render(){
    return (
        <div id="login--page">
        {/* <div id="section-login"> */}
        
        {/* <img src={brush} className="brush"/> */}



        <div className="login--header">
            <h1>ArtCom</h1>
        </div>
            
       <div id="pizzaUp">
           <p id="pizzaUp--context"> اگه توی آرتکام حساب نداری همین الان وقتشه ثبت نام کنی
           </p>
      
        <img src={EllipseUp} id="EllipseUp" onMouseEnter={this.signUpBtn}/>
        <div id="sliceUp"> 
       
        <img src={EllipseUp1} id="EllipseUp1" /> 
        <Link  to="/signUpa" id="btn-signup-a" onMouseEnter={this.signUpBtn}>ثبت نام هنرمند</Link>
     
        <img src={EllipseUp2} id="EllipseUp2"/>  
        <Link  to="/signUpn"  id="btn-signup-n" onMouseEnter={this.signUpBtn}>
            ثبت نام کاربر عادی
        </Link>
        </div>
       </div>
       
        <div id="pizzaDown">
        <p id="pizzaDown--context">
              حساب آرتکام داری ؟
                پس منتظر چی هستی ؟ 
           
           </p>

           <img src={EllipseDown} id="EllipseDown" onMouseEnter={this.loginBtn}/> 
           
           <img src={Ellipse4} id="Ellipse4" />
           <Link  to="/overflow" id="btn-login" onMouseEnter={this.loginBtn} >ورود</Link>
        </div>
            <img src={hero} id="hero" />
            <img src={pinkLine} id="line" />
            <Outlet/>
        {/* </div> */}
        </div>

    );
        }
}
export default Login ;