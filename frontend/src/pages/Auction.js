import "./auction.css";
import React, { useState } from "react";
import easel from "../img/easel.svg";
import timerfull from "../img/timer--full.svg";
import timerhalf from "../img/timer--half.svg";
import profileicon from "../img/profile--icon.svg";
import infoicon from "../img/info--icon.svg";
import number1 from "../img/1-solid.png";
import viewicon from "../img/view.png";
import moneyicon from "../img/sack-dollar-solid.png";

import { useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { useAuthContext } from "../hooks/useAuthContext";
import BackToHome from "../component/BackToHome";

function Auction() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { data } = useAxios("http://artcom-sjavanmard.fandogh.cloud/post/auctions/" + id);
  const ws = useRef(null);

  const navigator = useNavigate();

  const [time, setTime] = useState(0);
  const [post, setPost] = useState(null);
  const [next, setNext] = useState(true);
  const [nPost, setNPost] = useState(0);
  const [price, setPrice] = useState(null);
  const [finish, setFinish] = useState(false);

  const [is_allowed, setIsAllowed] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket(
      "ws://" +
        "artcom-sjavanmard.fandogh.cloud" +
        "/ws/chat/" +
        id +
        `/?token=${JSON.parse(localStorage.getItem("token"))}`
    );
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, [id]);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log(message.time);
      setTime(message.time);
      // setNPost(message.post_id)
      setNPost(message.n_post);
      setPrice(message.price);

      if (message.command === "pause") {
        setIsAllowed(false);
      }

      if (message.command === "start" ) {
        setIsAllowed(true);
      }

      if (message.time === 11 && !finish) {
        setNext(true);
      }
    };
  }, []);

  // ///////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!ws.current) return;
    if (next && data) {
      if (nPost < data.post.length) {
        setPost(data.post[nPost]);
        setPrice(data.post[nPost].price);
        console.log(post);
        setNPost((nPost) => nPost + 1);
      } else {
        setFinish(true);
      }

      setNext(false);
    }
  }, [nPost, next, data]);

  useEffect(() => {
    if (!data) return;
    if (time === 11 && !finish && user.is_superuser) {
      handleStart();
    }
  }, [finish, nPost]);

  const handleStart = () => {
    ws.current.send(
      JSON.stringify({
        command: "start",
        price: price,
        n_post: nPost,
        post_id: post.id,
        username: user.username,
      })
    );
  };

  const handleNewBid = (e) => {
    const np = parseFloat(e.target.value);
    const p = parseFloat(price);
    setPrice(np + p);
    ws.current.send(
      JSON.stringify({
        price: p + np,
        command: "new_price",
        n_post: nPost,
        post_id: post.id,
        username: user.username,
      })
    );
    ws.current.send(
      JSON.stringify({
        price: p + np,
        command: "start",
        n_post: nPost,
        post_id: post.id,
        username: user.username,
      })
    );
  };

  const handlePause = () => {
    ws.current.send(
      JSON.stringify({
        command: "pause",
        price: price,
        n_post: nPost,
        post_id: post.id,
        username: user.username,
      })
    );
  };

  useEffect(() => {
      
    const dot_timer = document.getElementById("dot");

    //dot_timer.style.visibility === 'visible' ? dot_timer.style.visibility = 'hidden' : dot_timer.style.visibility = 'visible'

    dot_timer.style.opacity === "1"
      ? (dot_timer.style.opacity = "0.2")
      : (dot_timer.style.opacity = "1");

    const half_timer = document.getElementById("timerhalf");
    const full_timer = document.getElementById("timerfull");

    if (time < 10) {
      half_timer.style.opacity = "1";
      full_timer.style.opacity = "0.2";
    } else {
      half_timer.style.opacity = "0.2";
      full_timer.style.opacity = "1";
    }
  }, [time]);

  useEffect(() => {
    if (finish) {
      navigator(`/auctionres/${id}`);
    }
  }, [finish]);

  return (
    <>
      <div id="Auction_Page">
        
        <div id="top-grid">
          <img src={infoicon} id="info-icon" />
          {/* <img src={number1} id ="number-icon" /> */}
          {post && <div id="info-icon-name"> نام اثر : {post.name} </div>}
          
          <img src={profileicon} id="profile-icon" />
          {post && (
            <div id="profile-icon-name">
              {" "}
              نام هنرمند : {post.artist.user.username}{" "}
            </div>
          )}
          <p id="time"> {time} </p>
          <div id="timer-box">
          <img src={timerhalf} id="timerhalf" />

          <div id="dot">.........</div>

          <img src={timerfull} id="timerfull" />
        </div>
        </div>
        
        <div id="center-grid">
          <div id="handle-box">
            {user?.is_superuser && (
              <button className="percent btn" onClick={handleStart}>
                شروع / ادامه
              </button>
            )}
            {user?.is_superuser && (
              <button className="percent btn" onClick={handlePause}>
                توقف
              </button>
            )}
          </div>

          <div id="enter-price-box">
          {!user?.is_superuser && is_allowed && user?.username !== post.artist.user.username && <h3 id="enter_price"> : قیمت پیشنهادی خود را انتخاب کنید</h3>}

            <div id="percent-box">
              {!user?.is_superuser && is_allowed && user?.username !== post.artist.user.username && (
                <>
                  <button
                    className="percent btn"
                    onClick={handleNewBid}
                    value={(price * 0.05).toFixed(2)}
                  >
                    +{(price * 0.05).toFixed(2)}
                  </button>
                  <button
                    className="percent btn"
                    onClick={handleNewBid}
                    value={(price * 0.1).toFixed(2)}
                  >
                    + {(price * 0.1).toFixed(2)}
                  </button>
                  <button
                    className="percent btn"
                    onClick={handleNewBid}
                    value={(price * 0.15).toFixed(2)}
                  >
                    + {(price * 0.15).toFixed(2)}
                  </button>
                  <button
                    className="percent btn"
                    onClick={handleNewBid}
                    value={(price * 0.2).toFixed(2)}
                  >
                    + {(price * 0.2).toFixed(2)}
                  </button>
                </>
              )}
            </div>
          </div>
          {post && 
        //   <div id="post" style={{ backgroundImage: `url(${post.image})`}} ></div>
          <img src={post.image} id="post" />
          }
         
          <div id="final-price-box">
            {price && <div className="current-price price">{price} تومان</div>}
          </div>
        </div>
        <div id="bottom-grid">
          <BackToHome />
          <div></div>
          <div id="number-box">
            <div id="number-text" className="clearfix">
              {nPost} اثر هنری شماره
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Auction;
