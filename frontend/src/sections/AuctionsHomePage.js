import React from "react";
import style from "../pages/HomePage.module.css";
import back from "../img/back.png";
import next from "../img/next.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import posts from "../img/posts.png";

export default function AuctionsHomePage() {
  //state
  const [timera, setTimerA] = useState("--:--:--");
  const [statusa, setStatusa] = useState(false);
  const [entera, setEntera] = useState("#");
  const [asara, setAsara] = useState("#");
  const [auctionPoster, setAuctionPoster] = useState("");
  const [statusatext, setStatusatext] = useState("");
  //func

  const backaHandle = () => {};

  const nextaHandle = () => {};
  const GoToAuction = () => {
    // navigator(`/auction/${user.id}`);
  };

  //useEffect
  useEffect(() => {
    if (statusa) setStatusatext("درحال برگزاری");
    else setStatusatext("شروع نشده");
  }, [statusa]);

  return (
    <div className={style.auction}>
      <input className={style.timer} type="text" value={timera} />
      <img src={back} alt="" className={style.backa} onClick={backaHandle} />
      <div className={style.bannera}>
        <img src={auctionPoster} alt="" className="" />
      </div>
      <img src={next} alt="" className={style.nexta} onClick={nextaHandle} />
      <button
        id={style.statusa}
        className={style.blue}
        style={{ color: statusa ? "green" : "red" }}
      >
        {statusatext}
      </button>
      <Link to={entera} id={style.entera}>
        <button className={style.blue}>ورود به مزایده</button>
      </Link>
      <Link id={style.asara} to={asara}>
        <button className={style.blue}>آثار هنری</button>
      </Link>
      <img src={posts} alt="posts" id={style.bpost} />
    </div>
  );
}
