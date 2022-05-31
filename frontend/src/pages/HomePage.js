import style from "./HomePage.module.css";
import Postlist from '../component/postlist/Postlist'

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Avatar from "../component/Avatar";
import { useAxios } from "../hooks/useAxios";
import ShowPlaceHomePage from "../sections/ShowPlaceHomePage";
import ShowPlaceProfile from "../sections/ShowPlaceProfile";

import AuctionsHomePage from "../sections/AuctionsHomePage";
import SearchBar from "../component/Searchbar/Searchbar";

export default function HomePage() {

  document.body.className = '';

  document.body.classList.add(style.bodyclass);

  window.onbeforeunload = function (event) {
    document.body.classList.remove(style.bodyclass);
  };


  // just for posts
  const { data , loading , error } = useAxios('http://artcom-sjavanmard.fandogh.cloud/post/posts')
  
  const navigator = useNavigate();

  

  const contactHandle = () => {
    navigator('/contactus')
  };


  return (
    <div className={style.homepage}>
      <div className={style.header}>
        <Avatar backColor="dark" />

        <SearchBar />

        <button className={style.contact} onClick={contactHandle}>ارتباط با ما</button>
      </div>
      <ShowPlaceHomePage />
      {/* <ShowPlaceProfile /> */}
      <AuctionsHomePage />
 
       {/* posts */}
      <div >
        {data && <Postlist posts={data} ishomepage={true} />}
    </div>
    </div>
  );
}
