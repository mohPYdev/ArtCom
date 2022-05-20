import React from "react";
import style from "../pages/PS_Artist.module.css";
import next from "../img/next.png";
import back from "../img/back.png";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import getPosts from "../function/getPosts";

export default function AuctionsProfile({ artistId }) {
  const { user } = useAuthContext();
  const indexOfPost = useRef("");
  const posts = useRef("");
  const artistid = useRef(artistId)
  const navigator = useNavigate();


  //State
  const [poster, setPoster] = useState("");
  const [status, setStatus] = useState("");
  const [statustext, setStatustext] = useState("");

  //useEffect
  useEffect(() => {
    if (status ) setStatustext("فروخته شده");
    else  setStatustext("فروخته نشده");

  }, [status]);
  useEffect(() => {
    async function fetchData() {
      if (artistid.current === undefined || artistid.current == user?.id) {
        artistid.current = user.id;
      } 

      const list = await getPosts( artistid.current);

      posts.current = list;
      indexOfPost.current = 0;
      changePost();
    }
    fetchData();
  }, []);

  //func

  const changePost = () => {
    setPoster(posts.current[indexOfPost.current]?.image);
    setStatus(posts.current[indexOfPost.current]?.sold);
  };
  const backaHandle = () => {
    indexOfPost.current = indexOfPost.current - 1;
    if (indexOfPost.current < 0) indexOfPost.current = posts.current.length - 1;

    changePost();
  };

  const nextaHandle = () => {
    indexOfPost.current++;
    if (indexOfPost.current >= posts.current.length) indexOfPost.current = 0;
    changePost();
  };

  const GoToPost = () => {
    navigator(`/post/${posts.current[indexOfPost.current].id}/${artistid.current}`)
  };
  const createPost = () => {};
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
          className={style.btn3}
          style={{ color: status ? "red" : "green"}}
        >
          {statustext}
        </button>
        {artistid.current === undefined || artistid.current === user?.id ? (
          <div id={style.createe}>
            <button className={style.btn2} onClick={createPost}>
              ایجاد پست{" "}
            </button>
          </div>
        ) : (
          <></>
        )}

        <div id={style.viewe}>
          <button className={style.btn2} onClick={GoToPost}>
            مشاهده
          </button>
        </div>
      </div>
    </>
  );
}
