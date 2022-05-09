import style from "./HomePage.module.css";

import mona from "../img/mona.png";

// import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Avatar from "../component/Avatar";
// import getExhibitions from "../function/getExhibitions";
import { useAxios } from "../hooks/useAxios";
import ShowPlaceHomePage from "../sections/ShowPlaceHomePage";
import AuctionsHomePage from "../sections/AuctionsHomePage";

export default function HomePage() {

  document.body.className = '';

  document.body.classList.add(style.bodyclass);

  window.onbeforeunload = function (event) {
    document.body.classList.remove(style.bodyclass);
  };
  
  const navigator = useNavigate();

  const [search, setSearch] = useState("");

  const searchHandle = (event) => {
    setSearch(event.target.value);
  };

  const contactHandle = (event) => {};

  return (
    <div>
      <div className={style.header}>
        <Avatar backColor="dark" />

        <input
          type="text"
          id={style.search}
          placeholder="جست و جو"
          value={search}
          onChange={searchHandle}
        />

        <button className={style.contact}>ارتباط با ما</button>
      </div>
      <ShowPlaceHomePage />
      <AuctionsHomePage />
    </div>
  );
}
