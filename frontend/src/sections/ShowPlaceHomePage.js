import React from "react";
import style from "../pages/HomePage.module.css";
import back from "../img/back.png";
import next from "../img/next.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function ExhibImage({ image_url }) {
  return <img src={image_url} alt="" className={style.ExhibPost} />;
}
export default function ShowPlaceHomePage() {
  //state
  const [timere, setTimerE] = useState("--:--:--");
  const [statuse, setStatuse] = useState(true);
  const [profilee, setProfilee] = useState("#");
  const [exhibPoster, setExhibPoster] = useState("");
  const [statusetext , setStatusetext] = useState("");
  const [entere, setEntere] = useState("#");

  //func
  const backeHandle = () => {
    
  };

  const nexteHandle = () => {

  };
  //useEffect
  useEffect(() => {
    if (statuse) setStatusetext("درحال برگزاری");
    else setStatusetext("شروع نشده");
  }, [statuse]);

  return (
    <div className={style.showplace}>
      <input className={style.timer} type="text" value={timere} />
      <img src={back} alt="" className={style.back} onClick={backeHandle} />
      <div className={style.bannere}>
        <ExhibImage image_url={exhibPoster} />
      </div>
      <img src={next} alt="" className={style.next} onClick={nexteHandle} />

      <button
        id={style.status}
        className={style.blue}
        style={{ color: statuse ? "green" : "red" }}
      >
        {statusetext}
      </button>

      <Link to={entere} id={style.enter}>
        <button className={style.blue} >
          ورود به نمایشگاه
        </button>
      </Link>

      <Link to={profilee} id={style.profile}>
        <button className={style.blue}>پروفایل هنرمند</button>
      </Link>
    </div>
  );
}
