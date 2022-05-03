import style from "./PS_Artist.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Avatar from "../component/Avatar";
import { useAuthContext } from "../hooks/useAuthContext";
import getArtistInfo from "../function/getArtistInfo";
import ShowPlaceProfile from "../sections/ShowPlaceProfile";
import AuctionsProfile from "../sections/AuctionsProfile";
import InfoBarProfile from "../sections/InfoBarProfile";
import AddPostHome from "../sections/AddPostHome";
import HeaderProfile from "../sections/HeaderProfile";
export default function PS_Artist() {
  document.body.classList.add(style.bodyclass);

  window.onbeforeunload = () => {
    document.body.classList.remove(style.bodyclass);
  };

  const navigator = useNavigate();

  const { artistId } = useParams();
  const { user } = useAuthContext();


  return (
    <div>
      <HeaderProfile id={artistId}/>

      <InfoBarProfile id={artistId}/>

      <AddPostHome id={artistId}/>
      <ShowPlaceProfile id={artistId}/>
      <AuctionsProfile id={artistId} />
    </div>
  );
}
