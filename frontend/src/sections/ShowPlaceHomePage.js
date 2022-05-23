import React from "react";
import style from "../pages/HomePage.module.css";
import back from "../img/back.png";
import next from "../img/next.png";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import getExhibitions from "../function/getExhibitions";
import { useAxios } from "../hooks/useAxios";
import { getShamsiDate , getRemainedTime} from "../function/calculateRemainedTime";
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

function ExhibImage({ image_url }) {
  return <img src={image_url} alt="" className={style.ExhibPost} />;
}
export default function ShowPlaceHomePage() {
  //  const { data, isPending, error } = useAxios(
  //       "http://localhost:8000/post/exhibitions/"
  //     );

  //Ref
  const end_date = useRef("")
  const indexOfExhibitons = useRef("");
  const exhibitions = useRef("");
  //state
  const [timere, setTimerE] = useState("");
  const [statuse, setStatuse] = useState();
  const [exhibPoster, setExhibPoster] = useState("");
  const [statusetext, setStatusetext] = useState("");
  const [shamsiDate , setShamsiDate] = useState("");
  const navigator = useNavigate("");

  //func
  const changePost = () => {
    setExhibPoster(
      exhibitions.current[indexOfExhibitons.current]?.cover
    );
    setStatuse(exhibitions.current[indexOfExhibitons.current]?.status);

    if (statuse === "open") {
      var end = exhibitions.current[indexOfExhibitons.current]?.date_end;
      setTimerE(getRemainedTime(end , statuse));
      setShamsiDate(getShamsiDate(end, statuse))
    } else {
      var start = exhibitions.current[indexOfExhibitons.current]?.date_begin;

      setTimerE(getRemainedTime(start, statuse));
      setShamsiDate(getShamsiDate(start, statuse));
    }
  };

  const backeHandle = () => {
    indexOfExhibitons.current = indexOfExhibitons.current - 1;
    if (indexOfExhibitons.current < 0)
      indexOfExhibitons.current = exhibitions.current.length - 1;
    changePost();
  };

  const nexteHandle = () => {
    indexOfExhibitons.current++;
    if (indexOfExhibitons.current >= exhibitions.current.length)
      indexOfExhibitons.current = 0;
    changePost();
  };
  const GoToShowPlace = () => {
    navigator(`/show/${exhibitions.current[indexOfExhibitons.current].id}`);
  };
  const GoToArtist = () => {
    
    navigator(`/psa/${+exhibitions.current[indexOfExhibitons.current].artist}`);
  };

  //useEffect
  useEffect(() => {
    if (statuse === "open") setStatusetext("درحال برگزاری");
    else if(statuse === "finished") setStatusetext("تمام شده");
    else if(statuse === "ns") setStatusetext("شروع نشده");
  }, [statuse]);

  useEffect(() => {
    async function fetchData() {
      const list = await getExhibitions("home");
      exhibitions.current = list;
      indexOfExhibitons.current = 0;
      changePost();
    }
    fetchData();
  }, []);

  return (
    <div className={style.showplace}>
      {statuse !== "finished" && 
      <div className={style.timer}><span>
      {statuse ==='open' ? ` : زمان مانده تا پایان  ` : ` : زمان مانده تا شروع ` }
      </span><br /><br />{timere} </div>}
      {statuse !== "finished" &&
      <Calendar
      calendar={persian}
      locale={persian_fa}
      className={style.calendere}
      value={shamsiDate}
    />
  }
  
      <button   className={style.back} onClick={backeHandle} >
        <img src={back}/>
      </button>
      <div className={style.bannere}>
        <ExhibImage image_url={exhibPoster} />
      </div>
      <img src={next} alt="" className={style.next} onClick={nexteHandle} />

      <button
        id={style.status}
        className={style.blue}
        style={{ color: statuse === "open" ? "green" : "red" }}
      >
        {statusetext}
      </button>

      {statuse === "open" && <div id={style.enter}>
        <button className={style.blue} onClick={GoToShowPlace}>
          ورود به نمایشگاه
        </button>
      </div>}

      <div id={style.profile}>
        <button className={style.blue} onClick={GoToArtist}>
          پروفایل هنرمند
        </button>
      </div>
    </div>
  );
}
