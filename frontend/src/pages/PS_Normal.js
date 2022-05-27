import style from './PS_Normal.module.css'
import cherry from '../img/Premium_Vector___Photographer_man-removebg.png'
import psnhome from "../img/icons8-home-page-50.png";
import pablo from '../img/pablo.png'
import picture from '../img/cherry.png'
import profile from "../img/profile--picture.png";
import { useState, useEffect } from 'react';
import Avatar from '../component/Avatar';
import { useNavigate } from 'react-router-dom';
import { useAuthContext} from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { Link } from "react-router-dom";
import Modal_popUp from "../component/Wallet";

export default function PS_Normal() {

    document.body.className = '';
    document.body.classList.add(style.bodyclass)

    window.onbeforeunload = () => {
        document.body.classList.remove(style.bodyclass)
    }

    const { logout, error, isPending } = useLogout();
    
    const navigator = useNavigate ();
    
    const { user } = useAuthContext();
    const [profileImg , setProfileImg] = useState(profile)
    const [name , setname] = useState('نام من')
    const [bio , setBio] = useState(' .... درباره من')
    const [following , setFollowing] = useState(user?.following_count)
    const [showwallet, setShowwallet] = useState(false);

    const handleClose = () => {
      setShowwallet(false)
    }
    const exitHandle = () => {
      logout()
      navigator(`/`)
      logout();

    }

    useEffect(() => {
      if (user){
          setname(user.first_name + " " + user.last_name)
          setProfileImg(user.image)
          setFollowing(user.following_count)
      }
  } , [user])

    const editHandle = () => {
      navigator(`/ProfileNormal`)
    }

  return (
    <div>
      <Link to="/home"><span><img id={style.psnhome} src={psnhome} /></span></Link>
        <div className={style.header}>
        
            <Avatar backColor="light"/>
            <div className={style.bio}>{bio}</div>
            <p className={style.following}>{following} Following</p>
            <button className={style.btn} id={style.edit} onClick={editHandle}>ویرایش</button>
            <button className={style.btn} id={style.wallet} onClick={() => setShowwallet(true)}>کیف پول</button>
            {showwallet && <Modal_popUp handleClose={handleClose} balance = {user.wallet} id={user.id}/>}
            <button className={style.btn} id={style.exit} onClick={exitHandle}>خروج</button>
        </div>

        <h1 className={style.artcom}>ArtCom</h1>
        <img id={style.img1} src={cherry}></img>
        <img id={style.img2} src={pablo}></img>
        <img id={style.img3} src={picture}></img>
    </div>
  )
}
