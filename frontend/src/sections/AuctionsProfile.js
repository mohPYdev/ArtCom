import React from 'react'
import style from '../pages/PS_Artist.module.css'
import next from "../img/next.png";
import back from "../img/back.png";
import mona from "../img/mona.png";
import { useState , useEffect, useRef } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

export default function AuctionsProfile() {

  const { user } = useAuthContext();

  //State
    const [auctionPoster, setAuctionPoster] = useState(mona);
    const [statusa, setStatusa] = useState(false);
    const [statusatext, setStatusatext] = useState("");
    const [entera, setEntera] = useState("#");
    const [asara, setAsara] = useState("#");
    const [view, setView] = useState("#");
    const [status, setStatus] = useState(true);
    const [statustext, setStatustext] = useState("");

    //useEffect
    useEffect(() => {
        if (status) setStatustext("درحال برگزاری");
        else setStatustext("شروع نشده");
      }, [status]);

      //func
    const backaHandle = () => {};

    const nextaHandle = () => {};
  return (
    <>
            <h1 className={style.exhibitionTitle}>مزایده</h1>
            <div className={style.showplace}>
            <img src={back} alt="" className={style.back} onClick={backaHandle} />
            <div className={style.bannere}>
                <img src={auctionPoster}  alt="" className={style.postere} />
            </div>
            <img src={next} alt="" className={style.next} onClick={nextaHandle} />

            <button
                id={style.status}
                className={style.btn2}
                style={{ color: status ? "green" : "red" }}
                >
                {statustext}
            </button>

            <a href={'#'} id={style.createe}>
                <button className={style.btn2}>ساخت مزایده</button>
            </a>

            <a href={view} id={style.viewe}>
                <button className={style.btn2}>مشاهده</button>
            </a>
        </div>
    </>
  )
}
