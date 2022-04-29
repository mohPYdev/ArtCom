import style from "./HomePage.module.css";
import back from "../img/back.png";
import next from "../img/next.png";
import mona from "../img/mona.png";
import posts from "../img/posts.png";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Avatar from "../component/Avatar";
import getExhibitions from "../function/getExhibitions";
function ExhibImage({ image_url }) {
  return <img src={image_url} alt="" className={style.ExhibPost} />;
}



export default function HomePage() {
  const indexOfExhibitons = useRef("");
  const exhibitions = useRef("")

  const { user } = useAuthContext();
  const [exhibPoster, setExhibPoster] = useState("");
  document.body.classList.add(style.bodyclass);

  window.onbeforeunload = function (event) {
    document.body.classList.remove(style.bodyclass);
  };
  const navigator = useNavigate();

  const [search, setSearch] = useState("");

  const [timere, setTimerE] = useState("--:--:--");
  const [statuse, setStatuse] = useState(true);
  const [statusetext, setStatusetext] = useState("");
  const [entere, setEntere] = useState("#");
  const [profilee, setProfilee] = useState("#");

  const [timera, setTimerA] = useState("--:--:--");
  const [auctionPoster, setAuctionPoster] = useState(mona);
  const [statusa, setStatusa] = useState(false);
  const [statusatext, setStatusatext] = useState("");
  const [entera, setEntera] = useState("#");
  const [asara, setAsara] = useState("#");

  
  useEffect(() => {
    if (statuse) setStatusetext("درحال برگزاری");
    else setStatusetext("شروع نشده");
  }, [statuse]);


  useEffect(() => {
    if (statusa) setStatusatext("درحال برگزاری");
    else setStatusatext("شروع نشده");
  }, [statusa]);
  useEffect( async() => {

    const list = await getExhibitions();
    exhibitions.current = list ;
    
    indexOfExhibitons.current = 0;
    console.log(exhibitions.current)
    setTimerE(exhibitions.current[indexOfExhibitons.current].date_end);


    setExhibPoster(exhibitions.current[indexOfExhibitons.current].posts[0].image);
    // console.log(exhibPoster)
}, []);


  const searchHandle = (event) => {
    setSearch(event.target.value);
  };

  const contactHandle = (event) => {};

  const backeHandle = () => {
    // console.log("back");
    indexOfExhibitons.current = indexOfExhibitons.current -1;
    if (indexOfExhibitons.current < 0) indexOfExhibitons.current = exhibitions.current.length - 1;
    setExhibPoster(exhibitions.current[indexOfExhibitons.current].posts[0].image);
    // console.log(indexOfExhibitons.current);
  };

  const nexteHandle = () => {
    // console.log("next");
    indexOfExhibitons.current++;
    if (indexOfExhibitons.current >= exhibitions.current.length) indexOfExhibitons.current = 0;

    setExhibPoster(exhibitions.current[indexOfExhibitons.current].posts[0].image);
    // console.log(indexOfExhibitons.current);
  };

  const backaHandle = () => {};

  const nextaHandle = () => {};

  const GoToAuction = () => {
    navigator(`/auction/${user.id}`);
  };
  const GoToShowPlace = () => {
    navigator(`/show/${indexOfExhibitons.current}`);
  };


  return (
    <div>
      <div className={style.header}>
        <Avatar backColor="dark" />

        <input
          type="text"
          id={style.search}
          placeholder="جست و جو"
          value={search}

          onChange={searchHandle}
        />
        <button className={style.contact} onClick={contactHandle}>
          ارتباط با ما
        </button>
      </div>

      <div className={style.showplace}>
        <input className={style.timer} type="text" value={timere} />
        <img src={back} alt="" className={style.back} onClick={backeHandle} />
        <div className={style.bannere}>
          <ExhibImage image_url={exhibPoster} />

        </div>
        <img src={next} alt="" className={style.next} onClick={nexteHandle} />

        <button
          id={style.status}
          className={style.blue}
          style={{ color: statuse ? "green" : "red" }}
        >
          {statusetext}
        </button>

        <a href={entere} id={style.enter}>
          <button className={style.blue} onClick={GoToShowPlace}>
            ورود به نمایشگاه
          </button>

        </a>

        <a href={profilee} id={style.profile}>
          <button className={style.blue}>پروفایل هنرمند</button>
        </a>
      </div>

      <div className={style.auction}>
        <input className={style.timer} type="text" value={timera} />
        <img src={back} alt="" className={style.backa} onClick={backaHandle} />
        <div className={style.bannera}>
          <img src={auctionPoster} alt="" className="" />
        </div>
        <img src={next} alt="" className={style.nexta} onClick={nextaHandle} />
        <button
          id={style.statusa}
          className={style.blue}
          style={{ color: statusa ? "green" : "red" }}
        >
          {statusatext}
        </button>
        <a href={entera} id={style.entera}>
          <button className={style.blue} onClick={GoToAuction}>
            ورود به مزایده
          </button>

        </a>
        <a id={style.asara} href={asara}>
          <button className={style.blue}>آثار هنری</button>
        </a>
        <img src={posts} alt="posts" id={style.bpost} />
      </div>
    </div>
  );
}
