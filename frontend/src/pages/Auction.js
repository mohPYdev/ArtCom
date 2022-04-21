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

import { useEffect, useRef } from 'react';
import {useParams} from 'react-router-dom';
function Auction () {

    const {roomName} = useParams();
    
    const chatSocket = new WebSocket(
            'ws://'
            + "localhost:8000"
            + '/ws/chat/'
            + roomName
            + '/'
        );

    const cs = useRef(chatSocket);



    useEffect(() => {
        cs.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data);
        };
    }, [cs, roomName]);


    
    chatSocket.onclose = function(e) {
        console.error('Chat socket closed unexpectedly');
    };

    const handleclick = (e) => {
        chatSocket.send(JSON.stringify({
            'message': 'Hello world!'
        }));
    };
    

    return (
        <>
            <div id="Auction_Page">
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
                        
                    <button onClick={handleclick}>
                    <div className="percent">
                        + 5 %
                    </div>
                    </button>  
                    <button onClick={handleclick}>
                    <div className="percent">
                        + 10 %
                    </div>
                    </button>
                    <button onClick={handleclick}>
                    <div className="percent">
                        + 15 %
                    </div>
                    </button>
                    <button onClick={handleclick}>
                    <div className="percent">
                        + 20 %
                    </div>
                    </button>
                    </div>  
                    
                    </div>
                    <div>
                        
                    </div>
                    <div id="price-box">
                        <div className="current-price price">
                            $2100
                        </div>
                        <div className="prev-price price">
                        $1800
                        </div>
                        <div className="prev-prev-price price">
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
                            <div id="number-text" className="clearfix">
                                ۱ اثر هنری شماره 
                            </div> 
                        </div>
                    </div>
            </div>
        
        </>
    )
}
export default Auction ;
