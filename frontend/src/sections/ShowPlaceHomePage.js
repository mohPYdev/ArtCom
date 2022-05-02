import React from "react";
import style from "../pages/HomePage.module.css";
import back from "../img/back.png";
import next from "../img/next.png";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import getExhibitions from "../function/getExhibitions";
import { useAxios } from "../hooks/useAxios";
function ExhibImage({ image_url }) {
  return <img src={image_url} alt="" className={style.ExhibPost} />;
}
export default function ShowPlaceHomePage() {


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

  //func
  const backeHandle = () => {
    // console.log("back");
    indexOfExhibitons.current = indexOfExhibitons.current - 1;
    if (indexOfExhibitons.current < 0)
      indexOfExhibitons.current = exhibitions.current.length - 1;
    setExhibPoster(
      exhibitions.current[indexOfExhibitons.current].posts[0].image
    );
    // console.log(indexOfExhibitons.current);
  };

  const nexteHandle = () => {
    // console.log("next");
    indexOfExhibitons.current++;
    if (indexOfExhibitons.current >= exhibitions.current.length)
      indexOfExhibitons.current = 0;

    setExhibPoster(
      exhibitions.current[indexOfExhibitons.current].posts[0].image
    );
    // console.log(indexOfExhibitons.current);
  };
  const GoToShowPlace = () => {
    setEntere(`/show/${indexOfExhibitons.current}`);
  };

  //useEffect
  useEffect(() => {
    if (statuse) setStatusetext("درحال برگزاری");
    else setStatusetext("شروع نشده");
  }, [statuse]);
  useEffect(() => {
    async function fetchData() {
      const list = await getExhibitions();
      exhibitions.current = list;

      indexOfExhibitons.current = 0;
      //console.log(exhibitions.current)
      setTimerE(exhibitions.current[indexOfExhibitons.current].date_end);

      setExhibPoster(
        exhibitions.current[indexOfExhibitons.current].posts[0].image
      );
      // console.log(exhibPoster)
    }
    fetchData();
  }, []);

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
        <button className={style.blue} onClick={GoToShowPlace}>ورود به نمایشگاه</button>
      </Link>

      <Link to={profilee} id={style.profile}>
        <button className={style.blue}>پروفایل هنرمند</button>
      </Link>
    </div>
  );
}
