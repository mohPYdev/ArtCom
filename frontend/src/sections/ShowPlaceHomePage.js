import React from "react";
import style from "../pages/HomePage.module.css";
import back from "../img/back.png";
import next from "../img/next.png";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import getExhibitions from "../function/getExhibitions";
import { useAxios } from "../hooks/useAxios";
function ExhibImage({ image_url }) {
  return <img src={image_url} alt="" className={style.ExhibPost} />;
}
export default function ShowPlaceHomePage() {
  //  const { data, isPending, error } = useAxios(
  //       "http://localhost:8000/post/exhibitions/"
  //     );

  //Ref
  const indexOfExhibitons = useRef("");
  const exhibitions = useRef("");
  //state
  const [timere, setTimerE] = useState("--:--:--");
  const [statuse, setStatuse] = useState(true);
  const [profilee, setProfilee] = useState("#");
  const [exhibPoster, setExhibPoster] = useState("");
  const [statusetext, setStatusetext] = useState("");
  const [entere, setEntere] = useState("#");
  const navigator = useNavigate("");

  //func
  const changePost = () => {
    setExhibPoster(
      exhibitions.current[indexOfExhibitons.current].posts[0].image
    );
    setStatuse(exhibitions.current[indexOfExhibitons.current].status);

     var end =  exhibitions.current[indexOfExhibitons.current].date_end ;
     var time_list = end.slice(0,10).split('-')
     var end_year = time_list[0]
     var end_month = time_list[1]
     var end_day = time_list[2]
     time_list= end.slice(11 ,19).split(':')
     var end_hour = time_list[0]
     var end_min = time_list[1]
     var end_sec = time_list[2]


     var today = new Date();
     var time_str =`  سال : ${+end_year - (+today.getFullYear())}
     ماه : ${Math.abs(+end_month - (+today.getMonth()+1))}
     روز : ${Math.abs(+end_day - (+today.getDate()))}
     ساعت : ${Math.abs(+end_hour - (+today.getHours()))}
     دقیقه : ${Math.abs(+end_min - (+today.getMinutes()+1))}
     ثانیه : ${Math.abs(+end_sec - (+today.getSeconds()+1))}
     `
    setTimerE(time_str);
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
    else setStatusetext("شروع نشده");
  }, [statuse]);

  
  useEffect(() => {
    async function fetchData() {
      const list = await getExhibitions();
      exhibitions.current = list;
      indexOfExhibitons.current = 0;
      changePost();
    }
    fetchData();
  }, []);

  return (
    <div className={style.showplace}>
      <div className={style.timer} >{timere} </div>
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
