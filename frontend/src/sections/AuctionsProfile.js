import React from "react";
import style from "../pages/PS_Artist.module.css";
import next from "../img/next.png";
import back from "../img/back.png";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import getAuctions from "../function/getAuctions";

export default function AuctionsProfile({ artistId }) {
  const { user } = useAuthContext();
  const indexOfAuctions = useRef("");
  const auctions = useRef("");
  const navigator = useNavigate();

  //State
  const [auctionPoster, setAuctionPoster] = useState("");
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

      const list = await getAuctions(state, artistId);

      auctions.current = list;
      indexOfAuctions.current = 0;
      changePost();
    }
    fetchData();
  }, []);

  //func

  const changePost = () => {
    setAuctionPoster(auctions.current[indexOfAuctions.current].post[0].image);
    setStatus(auctions.current[indexOfAuctions.current].status);
  };
  const backaHandle = () => {
    indexOfAuctions.current = indexOfAuctions.current - 1;
    if (indexOfAuctions.current < 0)
      indexOfAuctions.current = auctions.current.length - 1;

    changePost();
  };

  const nextaHandle = () => {
    indexOfAuctions.current++;
    if (indexOfAuctions.current >= auctions.current.length)
      indexOfAuctions.current = 0;
    changePost();
  };

  const GoToAuction = ()=>{

  }
  const createAuction = () => {
    
  }
  return (
    <>
      <h1 className={style.exhibitionTitle}>مزایده</h1>
      <div className={style.showplace}>
        <img src={back} alt="" className={style.back} onClick={backaHandle} />
        <div className={style.bannere}>
          <img src={auctionPoster} alt="" className={style.postere} />
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
          <button className={style.btn2} onClick={createAuction}>ساخت مزایده</button>
        </div>) : <></> }

        <div id={style.viewe}>
          <button className={style.btn2} onClick={GoToAuction}>مشاهده</button>
        </div>
      </div>
    </>
  );
}
