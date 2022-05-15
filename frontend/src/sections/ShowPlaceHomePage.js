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
      exhibitions.current[indexOfExhibitons.current].posts[0].image
    );
    setStatuse(exhibitions.current[indexOfExhibitons.current].status);

    if (statuse === "open") {
      var end = exhibitions.current[indexOfExhibitons.current].date_end;
      setTimerE(getRemainedTime(end));
      setShamsiDate(getShamsiDate(end))
    } else {
      var start = exhibitions.current[indexOfExhibitons.current].date_begin;

      setTimerE(getRemainedTime(start));
      setShamsiDate(getShamsiDate(start));
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
    navigator(`/show/${indexOfExhibitons.current}`);
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
      <div className={style.timer}>{timere} </div>
      <Calendar
      calendar={persian}
      locale={persian_fa}
      className={style.calendere}
      value={shamsiDate}
    />
      <img src={back} alt="" className={style.back} onClick={backeHandle} />
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

      <div id={style.enter}>
        <button className={style.blue} onClick={GoToShowPlace}>
          ورود به نمایشگاه
        </button>
      </div>

      <div id={style.profile}>
        <button className={style.blue} onClick={GoToArtist}>
          پروفایل هنرمند
        </button>
      </div>
    </div>
  );
}
