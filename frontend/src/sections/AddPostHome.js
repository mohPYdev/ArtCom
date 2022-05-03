import React from 'react'
import style from '../pages/PS_Artist.module.css'
import { useAuthContext } from '../hooks/useAuthContext';
import getArtistInfo from '../function/getArtistInfo';
import { useState , useEffect, useRef } from 'react';
import addp1 from "../img/addpost1.png";
import addp2 from "../img/addpost2.png";

export default function AddPostHome() {
  return (
    <div className={style.addpost}>
            <a>
                <img src={addp1} className={style.addp1}></img>
                <p className={style.cpost}>ایجاد پست جدید</p>
                <img src={addp2} className={style.addp2}></img>
            </a>
        </div>
  )
}
