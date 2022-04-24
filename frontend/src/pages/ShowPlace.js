import style from "./ShowPlace.module.css";
import frame from "../img/artwork.png";
import profile from "../img/profile.png";
import back from "../img/back.png";
import like from "../img/like.png";
import next from "../img/next.png";
import liveeye from "../img/liveeye.png";
import seeneye from "../img/seeneye.png";
import { useEffect, useState } from "react";

export default function ShowPlace() {
  document.body.classList.add(style.bodyclass);

  window.onbeforeunload = function () {
    document.body.classList.remove(style.bodyclass);
  };

  const [about, setAbout] = useState(
    "ایدهٔ این‌که پروانه‌ای می‌تواند باعث تغییری آشوبی شود نخستین بار در ۱۹۵۲ در داستان کوتاهی به نام آوای تندر اثر ری بردبری مطرح شد. عبارت «اثر پروانه‌ای» هم در ۱۹۶۱ در پی مقاله‌ای از ادوارد لورنتس به وجود آمد. وی در صد و سی و نهمین ؟»"
  );
  const [name, setName] = useState("-----");
  const [price, setPrice] = useState("---,---,---");
  const [date, setDate] = useState("--/--/--");
  const [profileImg, setProfileImg] = useState(profile);
  const [artwork, setArtwork] = useState(frame);
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

  const backHandler = () => {};

  const nextHandler = () => {};

  const exitHandler = () => {};

  const playHandler = () => {};

  const buyHandler = () => {};

  // fetch data
  useEffect(() => {}, []);

  return (
    <div>
      <div className={style.grid}>
        <div
          className={style.container}
          style={{ backgroundImage: `url(${artwork})` }}
        ></div>

        <img src={profileImg} alt="" id={style.profile} />
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
