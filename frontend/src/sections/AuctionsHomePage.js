import React from "react";
import style from "../pages/HomePage.module.css";
import back from "../img/back.png";
import next from "../img/next.png";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import posts from "../img/posts.png";
import { useAuthContext } from "../hooks/useAuthContext";
import getAuctions from "../function/getAuctions";
import { getShamsiDate , getRemainedTime} from "../function/calculateRemainedTime";
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DateObject from "react-date-object"

import { useAxios } from "../hooks/useAxios";

export default function AuctionsHomePage() {
  //fetch-data
  const { data} = useAxios(
    "http://localhost:8000/post/auctions/"
  );
  //Ref
  const indexOfAuctions = useRef("");
  const auctions = useRef("");
  const navigator = useNavigate();
  const { user } = useAuthContext();
  //state
  const [timera, setTimerA] = useState("");
  const [statusa, setStatusa] = useState();
  const [auctionPoster, setAuctionPoster] = useState("");
  const [statusatext, setStatusatext] = useState("");
  const [shamsiDate , setShamsiDate] = useState("");
  //func

  const changePost = () => {
    setAuctionPoster(auctions.current[indexOfAuctions.current]?.post[0].image);
    setStatusa(auctions.current[indexOfAuctions.current]?.status);
    if (statusa === "open") {
      var end = auctions.current[indexOfAuctions.current]?.date_end;

      setTimerA(getRemainedTime(end , statusa));
      setShamsiDate(getShamsiDate(end , statusa));
    } else {
      var start = auctions.current[indexOfAuctions.current]?.date_begin;

      setTimerA(getRemainedTime(start , statusa));
      setShamsiDate(getShamsiDate(start , statusa));
    }
  };
  const backaHandle = () => {
    indexOfAuctions.current = indexOfAuctions.current - 1;
    if (indexOfAuctions.current < 0)
      indexOfAuctions.current = auctions.current.length - 1;

    changePost();
  };

  const nextaHandle = () => {
    indexOfAuctions.current++;
    if (indexOfAuctions.current >= auctions.current.length)
      indexOfAuctions.current = 0;
    changePost();
  };
  const GoToAuction = () => {
    navigator(`/auction/${auctions.current[indexOfAuctions.current].id}`);
  };

  //useEffect
  useEffect(() => {
    if (statusa === "open") setStatusatext("درحال برگزاری");
      else if (statusa === "finished") setStatusatext("تمام شده");
      else if (statusa === "ns") setStatusatext("شروع نشده");
  }, [statusa]);

  useEffect(() => {
    
    if (data) {
      auctions.current = data;
      indexOfAuctions.current = 0;
      changePost();
    }

  }, [data]);

  return (
    <div className={style.auction}>
      <div className={style.timer}><span>
      {statusa ==='open' ? ` : زمان مانده تا پایان  ` : ` : زمان مانده تا شروع  ` }
      </span><br /><br />{timera}</div>
      <Calendar
      calendar={persian}
      locale={persian_fa}
      className={style.calendera}
      value={shamsiDate}
    />
      <img src={back} alt="" className={style.backa} onClick={backaHandle} />
      <div className={style.bannera}>
        <img src={auctionPoster} alt="" className="" />
      </div>
      <img src={next} alt="" className={style.nexta} onClick={nextaHandle} />
      <button
        id={style.statusa}
        className={style.blue}
        style={{ color: statusa === "open" ? "green" : "red" }}
      >
        {statusatext}
      </button>
      { statusa === "open" && user.wallet >= 100000 &&  <div id={style.entera}>
        <button className={style.blue} onClick={GoToAuction}>
          ورود به مزایده
        </button>
      </div>}

      { statusa === "open" && user.wallet < 100000 && <div id={style.entera}>
        <button className={style.blue} disabled>
          موجودی شما کافی نیست
        </button>
      </div>}


      <div id={style.asara}>
        <button className={style.blue}>آثار هنری</button>
      </div>
      <img src={posts} alt="posts" id={style.bpost} />
    </div>
  );
}
