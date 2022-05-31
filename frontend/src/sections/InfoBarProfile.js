import React from 'react'
import style from '../pages/PS_Artist.module.css'
import { useAuthContext } from '../hooks/useAuthContext';
import { useState , useEffect } from 'react';

import { useAxios} from '../hooks/useAxios'

export default function InfoBarProfile({artistId}) {

    const { user } = useAuthContext();
    const {data:artist} = useAxios("https://artcom-sjavanmard.fandogh.cloud/auth/users/"+artistId+"/profile/");

    const [postsNum , setPostsNum] = useState()
    const [exhibNum , setExhibsNum] = useState()
    const [followersNum , setFollowersNum] = useState()
    const [followingNum , setFollowingNum] = useState()

    const {data:art_posts} = useAxios("https://artcom-sjavanmard.fandogh.cloud/post/"+artistId+"/posts/");
    const {data:posts} = useAxios("https://artcom-sjavanmard.fandogh.cloud/post/posts/me/");
    const {data:exhibs} = useAxios("https://artcom-sjavanmard.fandogh.cloud/post/exhibitions/");


    useEffect(() => {
        if (!user) return ;
        if (artistId && artistId !== user.id) {
            if (artist && art_posts && exhibs) {
              setPostsNum(art_posts.length)
              console.log(artistId)
              setExhibsNum(exhibs.filter(exhib => exhib.artist == artistId).length)
              setFollowersNum(artist.artist.follower_count)
              setFollowingNum(artist.following_count)
            } 
        }
        else if (posts && exhibs){
            setPostsNum(posts.length)
            setExhibsNum(exhibs.filter(exhib => exhib.artist === user.id).length)
            setFollowersNum(user.artist.follower_count)
            setFollowingNum(user.following_count)
        }
        console.log(artist)
    } , [user, artist, artistId, art_posts, posts, exhibs])



  return (
    <div className={style.info}>
      {artist ?<p className={style.ratesNum}>{artist?.artist?.average_rating} : میانگین امتیاز</p>:
      <p className={style.ratesNum}>{user?.artist?.average_rating} : میانگین امتیاز</p>
}
          <p className={style.postsNum}>{postsNum}  : پست ها</p>
          <p className={style.exhibNum}>{exhibNum} :  نمایشگاه ها</p>
          <p className={style.followersNum}>{followersNum}  : دنبال کننده ها</p>
          <p className={style.followingNum}>{followingNum}  : دنبال شونده ها</p>
        </div>
  )
}
