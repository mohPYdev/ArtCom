import React from 'react'
import style from '../pages/PS_Artist.module.css'
import { useAuthContext } from '../hooks/useAuthContext';
import getArtistInfo from '../function/getArtistInfo';
import { useState , useEffect, useRef } from 'react';

import {useAxios} from '../hooks/useAxios';

export default function InfoBarProfile() {

    const { user } = useAuthContext();
    const {data:posts} = useAxios('http://localhost:8000/post/posts/');
    const {data:exhibitions} = useAxios('http://localhost:8000/post/exhibitions/');
    const {data:auctions} = useAxios('http://localhost:8000/post/auctions/');

    const [postsNum , setPostsNum] = useState(0)
    const [exhibNum , setExhibsNum] = useState(0)
    const [auctionNum , setAuctionNum] = useState(0)
    const [followersNum , setFollowersNum] = useState(0)
    const [followingNum , setFollowingNum] = useState(0)


    useEffect(() => {
      if (user && posts && exhibitions && auctions) {
        setPostsNum(posts.length)
        setExhibsNum(exhibitions.length)
        setAuctionNum(auctions.length)
        setFollowingNum(user.following_count)
        setFollowersNum(user.artist.follower_count)
      }

    },[user,posts,exhibitions,auctions])


  return (
    <div className={style.info}>
          <p className={style.postsNum}>{postsNum} Posts</p>
          <p className={style.exhibNum}>{exhibNum} Exhibition</p>
          <p className={style.auctionNum}>{auctionNum} Auction</p>
          <p className={style.followersNum}>{followersNum} follower</p>
          <p className={style.followingNum}>{followingNum} following</p>
    </div>
  )
}
