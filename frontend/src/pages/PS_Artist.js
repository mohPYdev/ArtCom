import style from "./PS_Artist.module.css";

import { useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

import ShowPlaceProfile from "../sections/ShowPlaceProfile";
import AuctionsProfile from "../sections/AuctionsProfile";
import InfoBarProfile from "../sections/InfoBarProfile";
import AddPostProfile from "../sections/AddPostProfile";
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

      {artistId === undefined || artistId == user.id ? (
        <AddPostProfile artistId={artistId} />
      ) : (
        <></>
      )}
      <ShowPlaceProfile artistId={artistId} />
      <AuctionsProfile artistId={artistId} />
    </div>
  );
}
