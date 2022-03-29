import './auction.css';
import React from 'react';
import easel from '../img/easel.svg';
import timerfull from '../img/timer--full.svg';
import timerhalf from '../img/timer--half.svg' ;
import profileicon from '../img/profile--icon.svg' ;
import infoicon from '../img/info--icon.svg'
class Auction extends React.Component {
constructor(props){
super(props);
}
render(){
    return (
        <>
        <img src={easel} id="easel"/>
        <div id="timer-box">
            <img src={timerhalf} id="timerhalf"/>
            <div id="dot">
                .........
            </div>

            <img src={timerfull } id="timerfull"/>
        </div>

        </>
    )
}
}
export default Auction ;