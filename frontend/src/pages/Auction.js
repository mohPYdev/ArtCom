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

import { useEffect, useRef, useCallback } from 'react';
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
    const [price, setPrice] = useState(null)
    const [finish, setFinish] = useState(false)

    const [is_allowed, setIsAllowed] = useState(false)



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
            setNPost(message.post_id)
            setPrice(message.price)

            

            if (message.command === 'pause'){
                setIsAllowed(false)
            }
            
            if (message.command === 'start' && message.username === 'admin'){
                setIsAllowed(true)
            }

            if (message.time === 11 && !finish)
            {
                setNext(true)
            }         
        };
    }, []);





// ///////////////////////////////////////////////////////////////////////////



    useEffect(() => {
        if (!ws.current) return;  
        if (next && data){
            
            if (nPost < data.post.length )
            {
                setPost(data.post[nPost])
                setPrice(data.post[nPost].price)
                setNPost(nPost => nPost + 1)
            }          
            else{
                setFinish(true)
            }
            
            setNext(false)
        }
    } , [nPost, next, data]);




    


    useEffect(() => {
        if (!data) return;
        if (time === 11 && !finish && user.is_superuser)
        {
            handleStart()
        }
    }, [finish, nPost])




    const handleStart =() => {
        ws.current.send(JSON.stringify({
            'command': 'start',
            'price': price,
            'n_post': nPost,
            'post_id': post.id,
            'username': user.username,
        }));
    }
    






    const handleNewBid = (e) => {
        const np = parseFloat(e.target.value)
        const p = parseFloat(price)
        setPrice(np + p)
        ws.current.send(JSON.stringify({
            'price': p + np,
            'command': 'new_price',
            'n_post': nPost,
            'post_id': post.id,
            'username': user.username,
        }));
        ws.current.send(JSON.stringify({
            'price': p + np,
            'command': 'start',
            'n_post': nPost,
            'post_id': post.id,
            'username': user.username,
        }));
    };



    const handlePause = () => {
        ws.current.send(JSON.stringify({
            'command': 'pause',
            'price': price,
            'n_post': nPost,
            'post_id': post.id,
            'username': user.username,
        }));
    }






    return (
        <>
            <div id="Auction_Page">
                <img src={easel} id="easel"/>
                <div id="top-grid"> 
                    <img src={infoicon} id="info-icon" />
                    {/* <img src={number1} id ="number-icon" /> */}
                    {post &&<div id="info-icon-name"> نام اثر : {post.name} </div>}
                    <p id='time'> {time} </p>
                    <img src={profileicon} id="profile-icon" />
                    <div id="profile-icon-name"> نام هنرمند  : {user?.username} </div>
                    
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
                       start/resume
                    </div>
                    </button>}
                    {user?.is_superuser && <button onClick={handlePause}>
                    <div className="percent">
                       pause
                    </div>
                    </button>}
                    {!user?.is_superuser && is_allowed && <>
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
                    </>}
                    
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
                        {post && <div className="prev-prev-price price">
                            {post.name}
                        </div>}
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
                                {nPost} اثر هنری شماره 
                            </div> 
                        </div>
                    </div>
            </div>
        
        </>
    )
}
export default Auction ;
