import style from "./PS_Artist.module.css";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

import ShowPlaceProfile from "../sections/ShowPlaceProfile";
import PostProfile from "../sections/PostProfile";
import InfoBarProfile from "../sections/InfoBarProfile";
import HeaderProfile from "../sections/HeaderProfile";
import addp1 from "../img/addpost1.png";
import addp2 from "../img/addpost2.png";
import { useEffect , useState} from "react";

// just for showing posts
import { useAxios } from '../hooks/useAxios'

import Postlist from '../component/postlist/Postlist'

export default function PS_Artist() {
  
  document.body.className = '';
  document.body.classList.add(style.bodyclass);

  window.onbeforeunload = () => {
    document.body.classList.remove(style.bodyclass);
  };

  const { artistId } = useParams();
  const [url , setUrl] = useState(`http://localhost:8000/post/${artistId}/posts`)
  // just for posts
  const { data , loading , error } = useAxios(url)

  const navigator = useNavigate();

  const { user } = useAuthContext();
  const [isSame, setIsSame] = useState();
  
  


  useEffect(()=>{
    if(!user) return;
    if (artistId && artistId !== user.id) {
      //see profile for other artist
      setIsSame(false);
    }
    else{
      setIsSame(true);
      setUrl(`http://localhost:8000/post/posts/me`)
    }  
  },[artistId, user])


  return (
    <div>
    
      <HeaderProfile artistId={artistId} />

      <InfoBarProfile artistId={artistId} />
      {isSame && (
      <div className={style.addpost}>
            <Link to={`/add/post`}>
                <img src={addp1} className={style.addp1}></img>
                <p className={style.cpost}>ساخت پست</p>
                <img src={addp2} className={style.addp2}></img>
            </Link>
        </div>)}
      <ShowPlaceProfile artistId={artistId} />
      <PostProfile artistId={artistId} />

       {/* posts */}
       <div className='home'>
          {error && <p className='error'>{error}</p>}
          {loading && <p className='loading'>Loading...</p>}
          {data && <Postlist posts={data} ishomepage={false}/>}
        </div>
    
    </div>
  );
}
