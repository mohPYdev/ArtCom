import style from "./HomePage.module.css";

// just for showing posts
import { useFetch } from '../hooks/useFetch'
import Postlist from '../component/postlist/Postlist'


// import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Avatar from "../component/Avatar";
// import getExhibitions from "../function/getExhibitions";
import { useAxios } from "../hooks/useAxios";
import ShowPlaceHomePage from "../sections/ShowPlaceHomePage";
import AuctionsHomePage from "../sections/AuctionsHomePage";
import SearchBar from "../component/SearchBar/SearchBar";

export default function HomePage() {

  document.body.className = '';

  document.body.classList.add(style.bodyclass);

  window.onbeforeunload = function (event) {
    document.body.classList.remove(style.bodyclass);
  };


  // just for posts
  const { data , loading , error } = useFetch('http://localhost:3000/posts')
  
  const navigator = useNavigate();

  

  const contactHandle = (event) => {};

  return (
    <div>
      <div className={style.header}>
        <Avatar backColor="dark" />

        <SearchBar />

        <button className={style.contact}>ارتباط با ما</button>
      </div>
      <ShowPlaceHomePage />
      <AuctionsHomePage />
 
       {/* posts */}
      <div className='home'>
        {error && <p className='error'>{error}</p>}
        {loading && <p className='loading'>Loading...</p>}
        {data && <Postlist posts={data} />}
    </div>
    </div>
  );
}
