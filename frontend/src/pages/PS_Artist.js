import style from './PS_Artist.module.css'
import psahome from "../img/icons8-home-page-50.png";
import profile from "../img/profile--picture.png";
import addp1 from "../img/addpost1.png";
import addp2 from "../img/addpost2.png";
import back from "../img/back.png";
import exhibition from "../img/exhibition.png";
import next from "../img/next.png";
import mona from "../img/mona.png";
import { useLogout } from '../hooks/useLogout';
import { useNavigate , useParams } from 'react-router-dom';
import { Outlet, Link  } from "react-router-dom";
import { useState , useEffect, useRef } from 'react';
import Avatar from '../component/Avatar';
import { useAuthContext } from '../hooks/useAuthContext';
import getArtistInfo from '../function/getArtistInfo';
import ShowPlaceProfile from '../sections/ShowPlaceProfile';
import AuctionsProfile from '../sections/AuctionsProfile';

export default function PS_Artist() {
    document.body.classList.add(style.bodyclass)

    window.onbeforeunload = () => {
        document.body.classList.remove(style.bodyclass)
    }

    const navigator = useNavigate();

    const {artistId} = useParams();
    const {user } = useAuthContext();

    const { logout, error, isPending } = useLogout();

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









    useEffect(()=>{
        
        async function fetchData(){

            console.log(artistId);

            const {first_name , last_name , description , image  , following_count} = await getArtistInfo(+artistId);
            setname(first_name + " " + last_name)
            setBio(description)
            setProfileImg(image)
            //setFollowersNum(follower_count)
            setFollowingNum(following_count)
            

        }
        if(artistId){

        //see profile for other artist
        fetchData()
        }
        else{
            //see your profile 
            setname(user.first_name + " " + user.last_name)
            setBio(user.artist.description)
            setProfileImg(user.image)
            //setFollowersNum(user.artist.follower_count)
            setFollowingNum(user.following_count)
        }

    },[])

    const exitHandle = () => {
        logout();
        navigator(`/`)


    }

    const editHandle = () => {
        navigator(`/ProfileArtist`)

    }

    
  return (
    <div>
        
        <div className={style.header}>
        <Link to="/home"><span><img id={style.psahome} src={psahome} /></span></Link>
        <img src={profileImg} alt="" className={style.profile} />
            <textarea value={bio} className={style.bio}></textarea>
            {isSame && <button className={style.btn} id={style.exit} onClick={exitHandle}>خروج</button>}
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
        <ShowPlaceProfile />
        <AuctionsProfile />
        





    </div>
  )
}
