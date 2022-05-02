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
  const indexOfExhibitons = useRef("");
  const exhibitions = useRef("")


  const {data, isPending, error} = useAxios('http://localhost:8000/post/exhibitions/');

  document.body.classList.add(style.bodyclass);

  window.onbeforeunload = function (event) {
    document.body.classList.remove(style.bodyclass);
  };
  const navigator = useNavigate();

  const [search, setSearch] = useState("");
  
  useEffect(() => {
    if (statuse) setStatusetext("درحال برگزاری");
    else setStatusetext("شروع نشده");
  }, [statuse]);


  useEffect(() => {
    if (statusa) setStatusatext("درحال برگزاری");
    else setStatusatext("شروع نشده");
  }, [statusa]);
  useEffect( async() => {

    const list = await getExhibitions();
    exhibitions.current = list ;
    
    indexOfExhibitons.current = 0;
    //console.log(exhibitions.current)
    setTimerE(exhibitions.current[indexOfExhibitons.current].date_end);


    setExhibPoster(exhibitions.current[indexOfExhibitons.current].posts[0].image);
    // console.log(exhibPoster)
}, []);


  const searchHandle = (event) => {
    setSearch(event.target.value);
  };

  const contactHandle = (event) => {};

  const backeHandle = () => {
    // console.log("back");
    indexOfExhibitons.current = indexOfExhibitons.current -1;
    if (indexOfExhibitons.current < 0) indexOfExhibitons.current = exhibitions.current.length - 1;
    setExhibPoster(exhibitions.current[indexOfExhibitons.current].posts[0].image);
    // console.log(indexOfExhibitons.current);
  };

  const nexteHandle = () => {
    // console.log("next");
    indexOfExhibitons.current++;
    if (indexOfExhibitons.current >= exhibitions.current.length) indexOfExhibitons.current = 0;

    setExhibPoster(exhibitions.current[indexOfExhibitons.current].posts[0].image);
    // console.log(indexOfExhibitons.current);
  };

  const backaHandle = () => {};

  const nextaHandle = () => {};

  const GoToAuction = () => {
    navigator(`/auction/${user.id}`);
  };
  const GoToShowPlace = () => {
    navigator(`/show/${indexOfExhibitons.current}`);
  };


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

        <button className={style.contact}>
          ارتباط با ما
        </button>
      </div>
      <ShowPlaceHomePage />
      <AuctionsHomePage />



      
    </div>
  );
}
