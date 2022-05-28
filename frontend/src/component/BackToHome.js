import React from 'react'
import { Link } from 'react-router-dom';
import lghome from "../img/icons8-home-30.png"
import './OverflowLogin.css'
export default function BackToHome() {
  return (
    <Link to="/home"><span><img id="lg_home" src={lghome} /></span></Link>
  )
}
