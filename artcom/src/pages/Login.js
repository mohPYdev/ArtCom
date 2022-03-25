import './Login.css';
import React from 'react';

import EllipseUp from '../img/Ellipse--up.svg';
import EllipseUp1 from '../img/EllipseUp1.svg';
import EllipseUp2 from '../img/EllipseUp2.svg';
import Ellipse4 from '../img/Ellipse4.svg';
import EllipseDown from '../img/EllipseDown.svg';
import hero from '../img/hero1.svg';
import pinkLine from '../img/pinkLine.svg';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.loadOverflowLogin=this.loadOverflowLogin.bind(this);
        
    }
    loadOverflowLogin(){
        const overflow = document.getElementById("overflowLogin") ;
        overflow.style.opacity="1";
        overflow.style.zIndex = "100"
        
    }
    render(){
    return (
        <>
        <div className="header">
            <h1>ArtCom</h1>
        </div>
            
       <div id="pizzaUp">
           
      
        <img src={EllipseUp} id="EllipseUp"/>
        <div div="sliceUp">
            <img src={EllipseUp1} id="EllipseUp1"/>
        <img src={EllipseUp2} id="EllipseUp2"/>
        </div>
       </div>
       
        <div id="pizzaDown">
            
           <img src={EllipseDown} id="EllipseDown"/> 
           
           <img src={Ellipse4} id="Ellipse4" />
           <button id="btn-login" onClick={this.loadOverflowLogin}> 
           </button>
           <div id="overflowLogin">
               
           </div>
        </div>
            <img src={hero} id="hero"/>
            <img src={pinkLine} id="line" />
      
        


        </>

    );
        }
}
export default Login ;