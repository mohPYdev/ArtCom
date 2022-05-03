import React from "react";
import style from "../pages/HomePage.module.css";
import back from "../img/back.png";
import next from "../img/next.png";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import posts from "../img/posts.png";
import { useAuthContext } from "../hooks/useAuthContext";
import getAuctions from "../function/getAuctions";
import calculateRemainedTime from "../function/calculateRemainedTime";

export default function AuctionsHomePage() {
  //fetch-data
  // const { data, isPending, error } = useAxios(
  //   "http://localhost:8000/post/auctions/"
  // );
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
  //func

  const changePost = () => {
    setAuctionPoster(auctions.current[indexOfAuctions.current].post[0].image);
    setStatusa(auctions.current[indexOfAuctions.current].status);

    var end =  auctions.current[indexOfAuctions.current].date_end ;
    
    
   setTimerA(calculateRemainedTime(end));
    
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
    navigator(`/auction/${user.id}`);
  };

  //useEffect
  useEffect(() => {
    if (statusa === "open") setStatusatext("درحال برگزاری");
    else setStatusatext("شروع نشده");
  }, [statusa]);

  useEffect(() => {
    async function fetchData() {
      const list = await getAuctions();
      auctions.current = list;
      indexOfAuctions.current = 0;
      changePost();
    }
    fetchData();
  }, []);

  return (
    <div className={style.auction}>
      <div className={style.timer} >{timera}</div>
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
      <div id={style.entera}>
        <button className={style.blue} onClick={GoToAuction}>
          ورود به مزایده
        </button>
      </div>
      <div id={style.asara} >
        <button className={style.blue}>آثار هنری</button>
      </div>
      <img src={posts} alt="posts" id={style.bpost} />
    </div>
  );
}
