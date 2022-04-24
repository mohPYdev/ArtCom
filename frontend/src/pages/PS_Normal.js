import style from './PS_Normal.module.css'
import cherry from '../img/cherry.png'
import psback from '../img/psback.png'
import pablo from '../img/pablo.png'
import profile from "../img/profile--picture.png";
import { useState } from 'react';


export default function PS_Normal() {
    document.body.classList.add(style.bodyclass)

    window.onbeforeunload = () => {
        document.body.classList.remove(style.bodyclass)
    }

    const [profileImg , setProfileImg] = useState(profile)
    const [name , setname] = useState('نام من')
    const [bio , setBio] = useState(' .... درباره من')
    const [following , setFollowing] = useState(30)

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
            <p className={style.following}>{following} Following</p>
            <button className={style.btn} id={style.edit} onClick={editHandle}>ویرایش</button>
            <button className={style.btn} id={style.exit} onClick={exitHandle}>خروج</button>
        </div>

        <h1 className={style.artcom}>ArtCom</h1>
        <img src={cherry}></img>
        <img src={pablo}></img>
        <img src={psback}></img>
    </div>
  )
}
