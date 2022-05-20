import style from "./PS_Artist.module.css";

import { useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

import ShowPlaceProfile from "../sections/ShowPlaceProfile";
import PostProfile from "../sections/PostProfile";
import InfoBarProfile from "../sections/InfoBarProfile";
import HeaderProfile from "../sections/HeaderProfile";
import addp1 from "../img/addpost1.png";
import addp2 from "../img/addpost2.png";


import ReactStars from "react-rating-stars-component";
import React from "react";

export default function PS_Artist() {
  
  document.body.className = '';
  document.body.classList.add(style.bodyclass);

  window.onbeforeunload = () => {
    document.body.classList.remove(style.bodyclass);
  };

  const navigator = useNavigate();

  const { artistId } = useParams();
  const { user } = useAuthContext();


  const ratingChanged = (newRating) => {
    console.log(newRating);
  };



  return (
    <div>
      <div className={style.star_rate}>
        <ReactStars
          count={5}
          onChange={()=>ratingChanged(false)}
          size={40}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#3B3B98"
          color="#A9A9A9"
        />
      </div>
      
 
      <HeaderProfile artistId={artistId} />

      <InfoBarProfile artistId={artistId} />

      <div className={style.addpost}>
            <a>
                <img src={addp1} className={style.addp1}></img>
                <p className={style.cpost}>شرکت در مزایده</p>
                <img src={addp2} className={style.addp2}></img>
            </a>
        </div>
      <ShowPlaceProfile artistId={artistId} />
      <PostProfile artistId={artistId} />
    </div>
  );
}
