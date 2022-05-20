import React from 'react'
import style from '../pages/PS_Artist.module.css'
import { useAuthContext } from '../hooks/useAuthContext';
import getArtistInfo from '../function/getArtistInfo';
import { useState , useEffect, useRef } from 'react';
import psahome from "../img/icons8-home-page-50.png";
import profile from "../img/profile--picture.png";
import { useLogout } from "../hooks/useLogout";
import { Outlet, Link  , Navigate, useNavigate} from "react-router-dom";

import {useAxios} from '../hooks/useAxios'

export default function HeaderProfile({artistId}) {

    const { user } = useAuthContext();
    const {data:artist} = useAxios("http://localhost:8000/auth/users/"+artistId+"/profile");

    const { logout, error, isPending } = useLogout();
    const navigator = useNavigate();
    

    const [followed, setFollowed] = useState(true);
    const [isSame, setIsSame] = useState(false);
  
    const [profileImg, setProfileImg] = useState(profile);
    const [name, setname] = useState("نام من");
    const [bio, setBio] = useState(" .... درباره من");



  useEffect(() => {

    if (artistId && artistId !== user.id) {
      setIsSame(false)
      setname(artist.username)
      setBio(artist.artist.description)
      setProfileImg(artist.image)
      setFollowed(artist.artist.followed)
    }
    else{
      setIsSame(true)
      setname(user.username)
      setBio(user.artist.description)
      setProfileImg(user.image)
    }
  }, [artistId, user, artist]);



  const exitHandle = () => {
    logout();
    navigator(`/`);
  };

  const editHandle = () => {
    navigator(`/ProfileArtist`);
  };


  return (
    <div className={style.header}>
        <Link to="/home" id={style.homebtn}>
            <img id={style.psahome} src={psahome} />

        </Link>
        <img src={profileImg} alt="" className={style.profile} />
        <div  className={style.bio}>{bio}</div>
        {isSame && (
          <button className={style.btn} id={style.exit} onClick={exitHandle}>
            خروج
          </button>
        )}
        {isSame && (
          <button className={style.btn} id={style.edit} onClick={editHandle}>
            ویرایش
          </button>
        )}
        {!isSame && !followed && (
          <button className={style.btn} id={style.follow} onClick={exitHandle}>
            follow
          </button>
        )}
        {!isSame && followed && (
          <button
            className={style.btn}
            id={style.unfollow}
            onClick={exitHandle}
          >
            unfollow
          </button>
        )}
      </div>
  )
}
