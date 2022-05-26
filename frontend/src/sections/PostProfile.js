import React from "react";
import style from "../pages/PS_Artist.module.css";
import { useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import addp1 from "../img/addpost1.png";
import addp2 from "../img/addpost2.png";

export default function AuctionsProfile({ artistId }) {
  const { user } = useAuthContext();
  const artistid = useRef(artistId)
  //const navigator = useNavigate();


  //State
  

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
