import './auction.css';
import React from 'react';
import easel from '../img/easel.svg';
import timerfull from '../img/timer--full.svg';
import timerhalf from '../img/timer--half.svg' ;
import profileicon from '../img/profile--icon.svg' ;
import infoicon from '../img/info--icon.svg';
import number1 from '../img/1-solid.png';
import viewicon from '../img/view.png';
import moneyicon from '../img/sack-dollar-solid.png';
class Auction extends React.Component {
constructor(props){
super(props);
}
render(){
    return (
        <>
        <img src={easel} id="easel"/>
        <div id="top-grid">
            
        <img src={infoicon} id="info-icon" />
       <img src={number1} id ="number-icon" />
       <img src={profileicon} id="profile-icon" />
        </div>

        <div id="timer-box">
            
            <img src={timerhalf} id="timerhalf"/>
            <div id="dot">
                .........
            </div>

            <img src={timerfull } id="timerfull"/>
        </div>
        <div id="center-grid">
            <div id="money-box">

            <img src={moneyicon} id="money-icon" /> 
             <div id="percent-box">
                 
            <a href="#">
            <div class="percent">
                 + 5 %
            </div></a>  
            <a href="#">
            <div class="percent">
                 + 10 %
            </div>
            </a>
            <a href="#">
            <div class="percent">
                 + 15 %
            </div>
            </a>
            <a href="#">
            <div class="percent">
                 + 20 %
            </div>
            </a>
             </div>  
            
            </div>
            <div>
                
            </div>
            <div id="price-box">
                <div class="current-price price">
                    $2100
                </div>
                <div class="prev-price price">
                $1800
                </div>
                <div class="prev-prev-price price">
                $1200
                </div>
            </div>
            
        </div>
        <div id="bottom-grid">
            <div id="view-box">
               <div id="view-number" className="clearfix">
                   4k 
               </div> 
           
               <img src={viewicon} id="view-icon" /> 
        </div>
        <div>
            
        </div>
        <div id="number-box">
        <div id="number-text" class="clearfix">
            
       
       ۱ اثر هنری شماره </div> 
        </div>
       </div>
        </>
    )
}
}
export default Auction ;