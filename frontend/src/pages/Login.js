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
import brush from '../img/brush.svg';
import {Button , Row  , Col} from 'react-bootstrap';
class Login extends React.Component{
    constructor(props){
        super(props);
        
    }
    
    render(){
    return (
        <>
        {/* <div id="section-login"> */}
        
        {/* <img src={brush} className="brush"/> */}



        <div className="header">
            <h1>ArtCom</h1>
        </div>
            
       <div id="pizzaUp">
           
      
        <img src={EllipseUp} id="EllipseUp"/>
        <div id="sliceUp"> 
       
        <img src={EllipseUp1} id="EllipseUp1"/> 
        <Link  to="/signUpa" id="btn-signup-a" >ثبت نام هنرمند</Link>
     
        <img src={EllipseUp2} id="EllipseUp2"/>  
        <Link  to="/signUpn"  id="btn-signup-n">
            ثبت نام کاربر عادی
        </Link>
        </div>
       </div>
       
        <div id="pizzaDown">
            
           <img src={EllipseDown} id="EllipseDown"/> 
           
           <img src={Ellipse4} id="Ellipse4" />
           <Link  to="/overflow" id="btn-login" >ورود</Link>
        </div>
            <img src={hero} id="hero"/>
            <img src={pinkLine} id="line" />
            <Outlet/>
        {/* </div> */}
        </>

    );
        }
}
export default Login ;