import React from 'react'
import style from '../pages/PS_Artist.module.css'
import { useAuthContext } from '../hooks/useAuthContext';
import { useState , useEffect } from 'react';

import { useAxios} from '../hooks/useAxios'

export default function InfoBarProfile({artistId}) {

    const { user } = useAuthContext();
    const {data:artist} = useAxios("http://localhost:8000/auth/users/"+artistId+"/profile/");

    const [postsNum , setPostsNum] = useState()
    const [exhibNum , setExhibsNum] = useState()
    const [followersNum , setFollowersNum] = useState()
    const [followingNum , setFollowingNum] = useState()

    const {data:art_posts} = useAxios("http://localhost:8000/post/"+artistId+"/posts/");
    const {data:posts} = useAxios("http://localhost:8000/post/posts/");
    const {data:exhibs} = useAxios("http://localhost:8000/post/exhibitions/");


    useEffect(() => {
        if (!user) return ;
        if (artistId && artistId !== user.id && exhibs && artist && art_posts) {
            setPostsNum(art_posts.length)
            console.log(artistId)
            setExhibsNum(exhibs.filter(exhib => exhib.artist == artistId).length)
            setFollowersNum(artist.artist.follower_count)
            setFollowingNum(artist.following_count)
        }
        else if (posts && exhibs){
            setPostsNum(posts.length)
            setExhibsNum(exhibs.filter(exhib => exhib.artist === user.id).length)
            setFollowersNum(user.artist.follower_count)
            setFollowingNum(user.following_count)
        }
    } , [user, artist, artistId, art_posts, posts, exhibs])



  return (
    <div className={style.info}>
      <p className={style.ratesNum}>{postsNum} : میانگین امتیاز</p>
          <p className={style.postsNum}>{postsNum}  : پست ها</p>
          <p className={style.exhibNum}>{exhibNum} :  نمایشگاه ها</p>
          <p className={style.followersNum}>{followersNum}  : دنبال کننده ها</p>
          <p className={style.followingNum}>{followingNum}  : دنبال شونده ها</p>
        </div>
  )
}
