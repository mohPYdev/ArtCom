import style from "./ShowPlace.module.css";
import back from "../img/back.png";
import like from "../img/like.png";
import next from "../img/next.png";
import liveeye from "../img/liveeye.png";
import seeneye from "../img/seeneye.png";
import { useEffect, useRef, useState } from "react";
import getOneExhibition from "../function/getOneExhibition";
import { useNavigate, useParams } from "react-router-dom";
import getArtistInfo from "../function/getArtistInfo";
import getPostInfo from "../function/getPostInfo";
import { useAlert } from "react-alert";

export default function ShowPlace() {
  document.body.classList.add(style.bodyclass);

  window.onbeforeunload = function () {
    document.body.classList.remove(style.bodyclass);
  };

  window.onload = function(){
    if(!window.location.hash){
      window.location.reload();
    }
  }


  const postsList = useRef("");
  const indexOfPost = useRef("");
  const user_id = useRef("");
  const alert = useAlert();

  const { id } = useParams("");
  const navigator = useNavigate();

  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("--/--/--");
  const [profileImg, setProfileImg] = useState("");
  const [artwork, setArtwork] = useState();
  const [count, setCount] = useState("");
  const [livecount, setLivecount] = useState("--");
  const [seencount, setSeencount] = useState("--");

  const [liked, setliked] = useState(false);

  const likeHandler = () => {
    if (liked) {

      setliked(false);
      setCount((prevcount)=>prevcount-1)
    } else {
      setliked(true);
      setCount((prevcount)=>prevcount+1)
    }
  };
  const ChangePost = async () => {
    const { image, name, description, price , like_count , liked } = await getPostInfo(
      user_id.current,
      +postsList.current[indexOfPost.current].id
    );
    setName(name);
    setArtwork(image);
    setAbout(description);
    setPrice(+price);
    setCount(+like_count)
    setliked(liked)
  };

  const backHandler = () => {
    indexOfPost.current--;
    if (indexOfPost.current < 0) {
      indexOfPost.current = 0;
      alert.error("اولین اثر نمایشگاه می باشد");
    }
    ChangePost();
  };

  const nextHandler = () => {
    indexOfPost.current++;
    if (indexOfPost.current >= postsList.current.length) {
      indexOfPost.current = postsList.current.length - 1;
      alert.error("آخرین اثر نمایشگاه می باشد");
    }
    ChangePost();
  };

  const exitHandler = () => {
    navigator(`/home`);
  };

  const playHandler = () => {};

  const buyHandler = () => {};

  // fetch data
  useEffect(() => {
    async function getData() {
      indexOfPost.current = 0;
      const { posts, artist } = await getOneExhibition(+id);
      postsList.current = posts;
      const { image, id: temp_id } = await getArtistInfo(+artist);
      user_id.current = temp_id;
      setProfileImg(image);
      ChangePost();
    }
    getData();
  }, []);
  const GotoArtistProfile = () => {
    navigator(`/psa/${user_id.current}`);
  };

  return (
    <div>
      <div className={style.grid}>
        <div
          className={style.container}
          style={{ backgroundImage: `url(${artwork})` }}
        ></div>

        <img
          src={profileImg}
          alt=""
          id={style.profile}
          onClick={GotoArtistProfile}
        />
        <div id={style.about} cols="18" rows="20">{about}</div>

        <div className={style.Name}>
          <h2 id={style.title}>نام</h2>
          <div

            id={style.title}
            className={style.values}
            
          >
            {name}</div>
        </div>

        <div className={style.Price}>
          <h2 id={style.title}>قیمت</h2>
          <div

            id={style.title}
            className={style.values}
            
          >{price}</div>
        </div>

        <div className={style.Date}>
          <h2 id={style.title}>تاریخ</h2>
          <div id={style.title} className={style.values} >{date}</div>
        </div>

        <img src={back} alt="back" id={style.back} onClick={backHandler} />

        <div className={style.likecontain}>
          <img
            src={like}
            className={liked ? style.liked : style.like}
            alt=""
            onClick={likeHandler}
          />
          <div id={style.count} >{count}</div>
        </div>

        <img src={next} alt="next" id={style.next} onClick={nextHandler} />

        <button className={style.btn} id={style.buy} onClick={buyHandler}>
          خرید
        </button>
        <button className={style.btn} id={style.play} onClick={playHandler}>
          پخش/توقف
        </button>
        <button className={style.btn} id={style.exit} onClick={exitHandler}>
          خروج
        </button>
        <div className={style.livebox}>
          <img src={liveeye} alt="" id={style.liveimg} />
          <div id={style.livecount}  >{livecount}</div>
        </div>
        <div className={style.seenbox}>
          <img src={seeneye} alt="" id={style.seenimg} />
          <div id={style.seencount}  >{seencount}</div>
        </div>
      </div>
    </div>
  );
}
