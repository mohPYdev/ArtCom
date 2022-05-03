import './auction.css';
import React, { useState } from 'react';
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
import {useAxios} from '../hooks/useAxios';
import {useAuthContext} from '../hooks/useAuthContext';

function Auction () {

    const {id} = useParams();
    const {user} = useAuthContext();
    const {data} = useAxios('http://localhost:8000/post/auctions/'+id);
    const ws = useRef(null);

    const [time, setTime] = useState(0)
    const [post, setPost] = useState(null)
    const [next, setNext] = useState(true)
    const [nPost, setNPost] = useState(0)
    const [price, setPrice] = useState(0)


    useEffect(() => {
        ws.current = new WebSocket('ws://'
                + "localhost:8000"
                + '/ws/chat/'
                + id
                + `/?token=${JSON.parse(localStorage.getItem('token'))}`);
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, [id]);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = e => {
            const message = JSON.parse(e.data);
            console.log(message.time);
            setTime(message.time);
            setPrice(message.price)
        };
    }, []);

    useEffect(() => {
        // changing the next to true by triggering this function and setting the next post on the screen
        if (!ws.current) return;
       
        if (next && data){
            setPost(data.post[nPost])
            setPrice(parseFloat(data.post[nPost].price))
            setNPost(nPost+1)
            setNext(false)
        }
    } , [nPost, next, data]);



    // handling different commands from the websocket

    // TODO: add username of the highest bidder to message

    const handleStart = (e) => {
        ws.current.send(JSON.stringify({
            'command': 'start',
            'price': price
        }));
    };
    
    const handleNewBid = (e) => {
        const np = parseFloat(e.target.value)
        setPrice(np + price)
        ws.current.send(JSON.stringify({
            'price': price + np,
            'command': 'new_price'
        }));
        ws.current.send(JSON.stringify({
            'price': price + np,
            'command': 'start'
        }));
    };


    return (
        <>
            <div id="Auction_Page">
                <img src={easel} id="easel"/>
                <div id="top-grid"> 
                    <img src={infoicon} id="info-icon" />
                    {/* <img src={number1} id ="number-icon" /> */}
                    <p id='time'> {time} </p>
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
                        
                    {user?.is_superuser && <button onClick={handleStart}>
                    <div className="percent">
                       start
                    </div>
                    </button>}
                    <button className='percent' onClick={handleNewBid} value={(price * 0.05).toFixed(2)}> 
                        +{(price * 0.05).toFixed(2)}$
                    </button>  
                    <button className='percent' onClick={handleNewBid} value={(price * 0.1).toFixed(2)}>
                        + {(price * 0.1).toFixed(2)}$
                    </button>
                    <button className='percent' onClick={handleNewBid} value={(price * 0.15).toFixed(2)}>
                        + {(price * 0.15).toFixed(2)}$
                    </button>
                    <button className='percent' onClick={handleNewBid} value={(price * 0.2).toFixed(2)}>
                        + {(price * 0.2).toFixed(2)}$
                    </button>
                    </div>  
                    
                    </div>
                    <div>
                        
                    </div>
                    <div id="price-box">
                        {price && <div className="current-price price">
                            ${price} - {user?.username}
                        </div>}
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
