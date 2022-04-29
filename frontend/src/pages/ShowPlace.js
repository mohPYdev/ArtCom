import style from "./ShowPlace.module.css";
import back from "../img/back.png";
import like from "../img/like.png";
import next from "../img/next.png";
import liveeye from "../img/liveeye.png";
import seeneye from "../img/seeneye.png";
import { useEffect, useRef, useState } from "react";
import getOneExhibition from "../function/getOneExhibition";
import {useNavigate, useParams} from "react-router-dom";
import getArtistInfo from "../function/getArtistInfo";

export default function ShowPlace() {
  document.body.classList.add(style.bodyclass);

  window.onbeforeunload = function () {
    document.body.classList.remove(style.bodyclass);
  };
  const postsList = useRef("");
  const indexOfPost = useRef("");
  const {id} = useParams("");
  const navigator = useNavigate();


  const [about, setAbout] = useState("info about this post");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("---,---,---");
  const [date, setDate] = useState("--/--/--");
  const [profileImg, setProfileImg] = useState("");
  const [artwork, setArtwork] = useState();
  const [count, setCount] = useState("--");
  const [livecount, setLivecount] = useState("--");
  const [seencount, setSeencount] = useState("--");

  const [liked, setliked] = useState(false);

  const likeHandler = () => {
    if (liked) {
      setliked(false);
    } else {
      setliked(true);
    }
  };
  const ChangePost = async ()=>{
    console.log(postsList.current)
    setName(postsList.current[indexOfPost.current].name)
    setArtwork( postsList.current[indexOfPost.current].image)

  }

  const backHandler = () => {
    indexOfPost.current--;
    if (indexOfPost.current < 0) indexOfPost.current = postsList.current.length - 1;
    ChangePost();
  };

  const nextHandler = () => {
    indexOfPost.current++;
    if (indexOfPost.current >= postsList.current.length) indexOfPost.current = 0;
    ChangePost();
  };

  const exitHandler = () => {
    navigator(`/home`)
  };

  const playHandler = () => {};

  const buyHandler = () => {};

  // fetch data
  useEffect(async() => {
    indexOfPost.current = 0 ;
    //console.log(id)
    const {posts , artist , date_end} = await getOneExhibition(+id);
    postsList.current = posts ;
    const { image}= await getArtistInfo(+artist)
    setProfileImg(image);
    ChangePost();
    
    

  }, []);
  const GotoProfile =()=>{
    navigator(`/psa`)

  }

  return (
    <div>
      <div className={style.grid}>
        <div
          className={style.container}
          style={{ backgroundImage: `url(${artwork})` }}
        ></div>

        <img src={profileImg} alt="" id={style.profile} onClick={GotoProfile} />
        <textarea value={about} id={style.about} cols="18" rows="20"></textarea>

        <div className={style.Name}>
          <h2 id={style.title}>نام</h2>
          <input
            type="text"
            id={style.title}
            className={style.values}
            value={name}
          />
        </div>

        <div className={style.Price}>
          <h2 id={style.title}>قیمت</h2>
          <input
            type="text"
            id={style.title}
            className={style.values}
            value={price}
          />
        </div>

        <div className={style.Date}>
          <h2 id={style.title}>تاریخ</h2>
          <input id={style.title} className={style.values} value={date} />
        </div>

        <img src={back} alt="back" id={style.back} onClick={backHandler} />

        <div className={style.likecontain}>
          <img
            src={like}
            className={liked ? style.liked : style.like}
            alt=""
            onClick={likeHandler}
          />
          <input id={style.count} value={count}></input>
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
          <input id={style.livecount} value={livecount} />
        </div>
        <div className={style.seenbox}>
          <img src={seeneye} alt="" id={style.seenimg} />
          <input id={style.seencount} value={seencount} />
        </div>
      </div>
    </div>
  );
}
