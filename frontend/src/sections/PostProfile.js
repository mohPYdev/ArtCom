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
  const [status, setStatus] = useState("");

  //useEffect


  //func



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
