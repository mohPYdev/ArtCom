import style from './PS_Artist.module.css'
import profile from "../img/profile--picture.png";
import addp1 from "../img/addpost1.png";
import addp2 from "../img/addpost2.png";
import { useState } from 'react';

export default function PS_Artist() {
    document.body.classList.add(style.bodyclass)

    window.onbeforeunload = () => {
        document.body.classList.remove(style.bodyclass)
    }

    const [profileImg , setProfileImg] = useState(profile)
    const [name , setname] = useState('نام من')
    const [bio , setBio] = useState(' .... درباره من')

    const [postsNum , setPostsNum] = useState(20)
    const [exhibNum , setExhibsNum] = useState(5)
    const [auctionNum , setAuctionNum] = useState(3)
    const [followersNum , setFollowersNum] = useState(1200)
    const [followingNum , setFollowingNum] = useState(50)

    const exitHandle = () => {

    }

    const editHandle = () => {

    }
    
  return (
    <div>
        <div className={style.header}>
            <img className={style.profile} src={profileImg}></img>
            <h2 className={style.name}>{name}</h2>
            <textarea value={bio} className={style.bio}></textarea>
            <button className={style.btn} id={style.edit} onClick={editHandle}>ویرایش</button>
            <button className={style.btn} id={style.exit} onClick={exitHandle}>خروج</button>
        </div>

        <div className={style.info}>
          <p className={style.postsNum}>{postsNum} Posts</p>
          <p className={style.exhibNum}>{exhibNum} Exhibition</p>
          <p className={style.auctionNum}>{auctionNum} Auction</p>
          <p className={style.followersNum}>{followersNum} follower</p>
          <p className={style.followingNum}>{followingNum} following</p>
        </div>

        <div className={style.addpost}>
            <img src={addp1} className={style.addp1}></img>
            <p className={style.cpost}>ساخت پست جدید</p>
            <img src={addp2} className={style.addp2}></img>
        </div>
    </div>
  )
}
