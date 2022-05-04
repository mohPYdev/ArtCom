import React from "react";
import style from "../pages/PS_Artist.module.css";
import next from "../img/next.png";
import back from "../img/back.png";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import getPosts from "../function/getPosts";

export default function AuctionsProfile({ artistId }) {
  const { user } = useAuthContext();
  const indexOfPost = useRef("");
  const posts = useRef("");
  const navigator = useNavigate();

  //State
  const [poster, setPoster] = useState("");
  const [status, setStatus] = useState("");
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
      if (artistId === undefined || artistId == user.id) state = "myProfile";
      else state = "otherProfile";

      const list = await getPosts(state, artistId);

      posts.current = list;
      indexOfPost.current = 0;
      changePost();
    }
    fetchData();
  }, []);

  //func

  const changePost = () => {
    setPoster(posts.current[indexOfPost.current].image);
    setStatus(posts.current[indexOfPost.current].status);
  };
  const backaHandle = () => {
    indexOfPost.current = indexOfPost.current - 1;
    if (indexOfPost.current < 0)
      indexOfPost.current = posts.current.length - 1;

    changePost();
  };

  const nextaHandle = () => {
    indexOfPost.current++;
    if (indexOfPost.current >= posts.current.length)
      indexOfPost.current = 0;
    changePost();
  };

  const GoToPost = ()=>{

  }
  const createPost = () => {
    
  }
  return (
    <>
      <h1 className={style.exhibitionTitle}>پست</h1>
      <div className={style.showplace}>
        <img src={back} alt="" className={style.back} onClick={backaHandle} />
        <div className={style.bannere}>
          <img src={poster} alt="" className={style.postere} />
        </div>
        <img src={next} alt="" className={style.next} onClick={nextaHandle} />

        <button
          id={style.status}
          className={style.btn2}
          style={{ color: status === "open" ? "green" : "red" }}
        >
          {statustext}
        </button>
        {artistId === undefined || artistId === user.id ? (
        <div id={style.createe}>
          <button className={style.btn2} onClick={createPost}>ایجاد پست </button>
        </div>) : <></> }

        <div id={style.viewe}>
          <button className={style.btn2} onClick={GoToPost}>مشاهده</button>
        </div>
      </div>
    </>
  );
}
