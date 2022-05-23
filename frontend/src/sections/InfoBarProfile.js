import React from 'react'
import style from '../pages/PS_Artist.module.css'
import { useAuthContext } from '../hooks/useAuthContext';
import { useState , useEffect } from 'react';

import { useAxios} from '../hooks/useAxios'

export default function InfoBarProfile({artistId}) {

    const { user } = useAuthContext();
    const {data:artist} = useAxios("http://localhost:8000/auth/users/"+artistId+"/profile/");

    const [postsNum , setPostsNum] = useState(20)
    const [exhibNum , setExhibsNum] = useState(5)
    const [followersNum , setFollowersNum] = useState(1200)
    const [followingNum , setFollowingNum] = useState(50)

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
            setFollowingNum(user.artist.following_count)
        }
    } , [user, artist, artistId, art_posts, posts, exhibs])



  return (
    <div className={style.info}>
          <p className={style.postsNum}>{postsNum} Posts</p>
          <p className={style.exhibNum}>{exhibNum} Exhibition</p>
          <p className={style.followersNum}>{followersNum} follower</p>
          <p className={style.followingNum}>{followingNum} following</p>
        </div>
  )
}
