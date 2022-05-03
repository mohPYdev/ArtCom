import React from 'react'
import style from '../pages/PS_Artist.module.css'
import { useAuthContext } from '../hooks/useAuthContext';
import getArtistInfo from '../function/getArtistInfo';
import { useState , useEffect, useRef } from 'react';
export default function InfoBarProfile() {

    const [postsNum , setPostsNum] = useState(20)
    const [exhibNum , setExhibsNum] = useState(5)
    const [auctionNum , setAuctionNum] = useState(3)
    const [followersNum , setFollowersNum] = useState(1200)
    const [followingNum , setFollowingNum] = useState(50)
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
