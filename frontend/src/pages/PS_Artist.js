import style from "./PS_Artist.module.css";

import { useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

import ShowPlaceProfile from "../sections/ShowPlaceProfile";
import PostProfile from "../sections/PostProfile";
import InfoBarProfile from "../sections/InfoBarProfile";
import HeaderProfile from "../sections/HeaderProfile";
import addp1 from "../img/addpost1.png";
import addp2 from "../img/addpost2.png";

export default function PS_Artist() {
  
  document.body.className = '';
  document.body.classList.add(style.bodyclass);

  window.onbeforeunload = () => {
    document.body.classList.remove(style.bodyclass);
  };

  const navigator = useNavigate();

  const { artistId } = useParams();
  const { user } = useAuthContext();


  return (
    <div>
    
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
