import React from "react";
import style from "../pages/PS_Artist.module.css";
import next from "../img/next.png";
import back from "../img/back.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import getExhibitions from "../function/getExhibitions";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAlert } from "react-alert";

export default function ShowPlaceProfile({ artistId }) {
  const navigator = useNavigate();
  const { user } = useAuthContext();
  const alert = useAlert();

  //Ref
  const indexOfExhibitons = useRef("");
  const exhibitions = useRef("");

  //State
  const [exhibPoster, setExhibPoster] = useState();
  const [status, setStatus] = useState();
  const [statustext, setStatustext] = useState("");

  //useEffect
  useEffect(() => {
    if (status === "open") setStatustext("درحال برگزاری");
    else if (status === "finished") setStatustext("تمام شده");
    else if (status === "ns") setStatustext("شروع نشده");
  }, [status]);

  useEffect(() => {
    async function fetchData() {
      let state;

      if (artistId === undefined || artistId === user?.id) state = "myProfile";
      else state = "otherProfile";

      const list = await getExhibitions(state, artistId);

      exhibitions.current = list;
      indexOfExhibitons.current = 0;
      changePost();
    }
    fetchData();
  }, [artistId, user]);

  //func
  const changePost = () => {
    if (exhibitions.current[indexOfExhibitons.current] !== null) {
      setExhibPoster(exhibitions.current[indexOfExhibitons.current]?.cover);
      setStatus(exhibitions.current[indexOfExhibitons.current]?.status);
    } else {
      nexteHandle();
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
  const createExhibitions = () => {
    navigator(`/add/exhibition`);
  };
  const GoToShowPlace = () => {
    if(exhibPoster === undefined){
      alert.error(`! نمایشگاهی موجود نیست`)

    }
    else
    navigator(`/show/${exhibitions.current[indexOfExhibitons.current].id}`);
  };
  return (
    <>
      <h1 className={style.exhibitionTitle}>نمایشگاه</h1>

      <div className={style.showplace}>
        <img src={back} alt="" className={style.back} onClick={backeHandle} />
        <div className={style.bannere}>
          <img src={exhibPoster} alt="" className={style.postere} />
        </div>
        <img src={next} alt="" className={style.next} onClick={nexteHandle} />

        <button
          id={style.status}
          className={style.btn3}
          style={{ color: status === "open" ? "green" : "red" }}
        >
          {statustext}
        </button>

        {artistId === undefined || +artistId === +user?.id ? (
          <div id={style.createe}>
            <button className={style.btn2} onClick={createExhibitions}>
              ساخت نمایشگاه
            </button>
          </div>
        ) : (
          <></>
        )}
        <div id={style.viewe}>
          <button className={style.btn2} onClick={GoToShowPlace} disabled={status === "open" ? false : true } >
            مشاهده
          </button>

        </div>
  {/* )} */}
      </div>
    </>
  );
}
