import React from 'react'
import style from '../pages/PS_Artist.module.css'
import { useAuthContext } from '../hooks/useAuthContext';
import getArtistInfo from '../function/getArtistInfo';
import { useState , useEffect, useRef } from 'react';
import psahome from "../img/icons8-home-page-50.png";
import profile from "../img/profile--picture.png";
import { useLogout } from "../hooks/useLogout";
import { Outlet, Link  , Navigate, useNavigate} from "react-router-dom";
export default function HeaderProfile({artistId}) {

    const { user } = useAuthContext();

    const { logout, error, isPending } = useLogout();
    const navigator = useNavigate();
    const [followingNum, setFollowingNum] = useState(50);
    const [followed, setFollowed] = useState(true);
    const [isSame, setIsSame] = useState();
  
    const [profileImg, setProfileImg] = useState(profile);
    const [name, setname] = useState("نام من");
    const [bio, setBio] = useState(" .... درباره من");

  useEffect(() => {
    async function fetchData() {
      console.log(artistId);

      const { first_name, last_name, description, image, following_count } =
        await getArtistInfo(+artistId);
      setname(first_name + " " + last_name);
      setBio(description);
      setProfileImg(image);
      //setFollowersNum(follower_count)
      setFollowingNum(following_count);
    }
    if (artistId && artistId != user.id) {
      //see profile for other artist
      fetchData();
      setIsSame(false);
    } else {
      //see your profile
      setname(user.first_name + " " + user.last_name);
      setBio(user.artist.description);
      setProfileImg(user.image);
      //setFollowersNum(user.artist.follower_count)
      setFollowingNum(user.following_count);
      setIsSame(true);
    }
  }, []);

  const exitHandle = () => {
    logout();
    navigator(`/`);
  };

  const editHandle = () => {
    navigator(`/ProfileArtist`);
  };


  return (
    <div className={style.header}>
        <Link to="/home" id="homebtn">
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
