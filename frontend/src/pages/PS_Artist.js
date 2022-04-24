import style from './PS_Artist.module.css'
import profile from "../img/profile--picture.png";
import addp1 from "../img/addpost1.png";
import addp2 from "../img/addpost2.png";
import back from "../img/back.png";
import exhibition from "../img/exhibition.png";
import next from "../img/next.png";
import mona from "../img/mona.png";

import { useState , useEffect } from 'react';

export default function PS_Artist() {
    document.body.classList.add(style.bodyclass)

    window.onbeforeunload = () => {
        document.body.classList.remove(style.bodyclass)
    }

    const [followed , setFollowed] = useState(true)
    const [isSame , setIsSame] = useState(true)

    const [profileImg , setProfileImg] = useState(profile)
    const [name , setname] = useState('نام من')
    const [bio , setBio] = useState(' .... درباره من')

    const [postsNum , setPostsNum] = useState(20)
    const [exhibNum , setExhibsNum] = useState(5)
    const [auctionNum , setAuctionNum] = useState(3)
    const [followersNum , setFollowersNum] = useState(1200)
    const [followingNum , setFollowingNum] = useState(50)

    const [exhibPoster, setExhibPoster] = useState(exhibition);
    const [statuse, setStatuse] = useState(true);
    const [statusetext, setStatusetext] = useState("");
    const [view, setView] = useState("#");

    const [auctionPoster, setAuctionPoster] = useState(mona);
    const [statusa, setStatusa] = useState(false);
    const [statusatext, setStatusatext] = useState("");
    const [entera, setEntera] = useState("#");
    const [asara, setAsara] = useState("#");

    useEffect(() => {
        if (statuse) setStatusetext("درحال برگزاری");
        else setStatusetext("شروع نشده");
      }, statuse);

    const exitHandle = () => {

    }

    const editHandle = () => {

    }

    const backeHandle = () => {};

    const nexteHandle = () => {};
    
  return (
    <div>
        <div className={style.header}>
            <img className={style.profile} src={profileImg}></img>
            <h2 className={style.name}>{name}</h2>
            <textarea value={bio} className={style.bio}></textarea>
            <button className={style.btn} id={style.exit} onClick={exitHandle}>خروج</button>
            {isSame && <button className={style.btn} id={style.edit} onClick={editHandle}>ویرایش</button>}
            {!isSame && !followed && <button className={style.btn} id={style.follow} onClick={exitHandle}>follow</button>}
            {!isSame && followed && <button className={style.btn} id={style.unfollow} onClick={exitHandle}>unfollow</button>}
        </div>

        <div className={style.info}>
          <p className={style.postsNum}>{postsNum} Posts</p>
          <p className={style.exhibNum}>{exhibNum} Exhibition</p>
          <p className={style.auctionNum}>{auctionNum} Auction</p>
          <p className={style.followersNum}>{followersNum} follower</p>
          <p className={style.followingNum}>{followingNum} following</p>
        </div>

        <div className={style.addpost}>
            <a>
                <img src={addp1} className={style.addp1}></img>
                <p className={style.cpost}>ایجاد پست جدید</p>
                <img src={addp2} className={style.addp2}></img>
            </a>
        </div>
        
        <h1 className={style.exhibitionTitle}>نمایشگاه</h1>

        <div className={style.showplace}>
            <img src={back} alt="" className={style.back} onClick={backeHandle} />
            <div className={style.bannere}>
                <img src={exhibPoster}  alt="" className={style.postere} />
            </div>
            <img src={next} alt="" className={style.next} onClick={nexteHandle} />

            <button
                id={style.status}
                className={style.btn2}
                style={{ color: statuse ? "green" : "red" }}
                >
                {statusetext}
            </button>

            <a href={'#'} id={style.createe}>
                <button className={style.btn2}>ساخت نمایشگاه</button>
            </a>

            <a href={view} id={style.viewe}>
                <button className={style.btn2}>مشاهده</button>
            </a>
        </div>

        <h1 className={style.exhibitionTitle}>مزایده</h1>

        <div className={style.showplace}>
            <img src={back} alt="" className={style.back} onClick={backeHandle} />
            <div className={style.bannere}>
                <img src={auctionPoster}  alt="" className={style.postere} />
            </div>
            <img src={next} alt="" className={style.next} onClick={nexteHandle} />

            <button
                id={style.status}
                className={style.btn2}
                style={{ color: statuse ? "green" : "red" }}
                >
                {statusetext}
            </button>

            <a href={'#'} id={style.createe}>
                <button className={style.btn2}>ساخت مزایده</button>
            </a>

            <a href={view} id={style.viewe}>
                <button className={style.btn2}>مشاهده</button>
            </a>
        </div>

    </div>
  )
}
