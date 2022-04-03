import './auction.css';
import React from 'react';
import easel from '../img/easel.svg';
import timerfull from '../img/timer--full.svg';
import timerhalf from '../img/timer--half.svg' ;
import profileicon from '../img/profile--icon.svg' ;
import infoicon from '../img/info--icon.svg';
import number1 from '../img/1-solid.svg';
import viewicon from '../img/view.svg';
import moneyicon from '../img/sack-dollar-solid.svg';
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
            <img src={moneyicon} id="money-icon" />
            
            
        </div>
        <div id="bottom-grid">

        <img src={viewicon} id="view-icon" />
        <div>
            
        </div>
        <img src={number1} id ="number-icon" />
       </div>
        </>
    )
}
}
export default Auction ;