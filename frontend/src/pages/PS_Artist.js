import style from "./PS_Artist.module.css";

import { useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

import ShowPlaceProfile from "../sections/ShowPlaceProfile";
import PostProfile from "../sections/PostProfile";
import InfoBarProfile from "../sections/InfoBarProfile";
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
      <HeaderProfile artistId={artistId} />

      <InfoBarProfile artistId={artistId} />

      
      <ShowPlaceProfile artistId={artistId} />
      <PostProfile artistId={artistId} />
    </div>
  );
}
