import React from "react";
import style from "../pages/PS_Artist.module.css";
import next from "../img/next.png";
import back from "../img/back.png";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import getPosts from "../function/getPosts";
import addp1 from "../img/addpost1.png";
import addp2 from "../img/addpost2.png";

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
  const createPost = () => {
    navigator(`/add/post`);
  };
  return (
    <>
      <div className={style.addpost}>
        <Link to={`/add/auction`}>
            <img src={addp1} className={style.addp1}></img>
            <p className={style.cpost}>شرکت در مزایده</p>
            <img src={addp2} className={style.addp2}></img>
        </Link>
      </div>)
    </>
  );
}
