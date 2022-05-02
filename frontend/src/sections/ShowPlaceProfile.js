import React from 'react'
import style from '../pages/PS_Artist.module.css'
import next from "../img/next.png";
import back from "../img/back.png";
import { useState , useEffect, useRef } from 'react';

export default function ShowPlaceProfile() {

    const [exhibPoster, setExhibPoster] = useState();
    const [status, setStatus] = useState(true);
    const [statustext, setStatustext] = useState("");
    const [view, setView] = useState("#");

    useEffect(() => {
        if (status) setStatustext("درحال برگزاری");
        else setStatustext("شروع نشده");
      }, [status]);

    const backeHandle = () => {};

    const nexteHandle = () => {};
  return (
    <>
    <h1 className={style.exhibitionTitle}>نمایشگاه</h1>

<div className={style.showplace}>
    <img src={back} alt="" className={style.back} onClick={backeHandle} />
    <div className={style.bannere}>
        <img src={exhibPoster}  alt="" className={style.postere} />
    </div>
    <img src={next} alt="" className={style.next} onClick={nexteHandle} />

    <button
        id={style.status}
        className={style.btn2}
        style={{ color: status ? "green" : "red" }}
        >
        {statustext}
    </button>

    <a href={'#'} id={style.createe}>
        <button className={style.btn2}>ساخت نمایشگاه</button>
    </a>

    <a href={view} id={style.viewe}>
        <button className={style.btn2}>مشاهده</button>
    </a>
</div>
    </>
  )
}
