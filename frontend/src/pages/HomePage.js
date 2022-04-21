import style from './HomePage.module.css'
import profile from '../img/profile--picture.png'
import back from '../img/back.png'
import exhibition from '../img/exhibition.png'
import next from '../img/next.png'
import mona from '../img/mona.png'
import posts from '../img/posts.png'
import { useEffect, useState } from 'react'

export default function HomePage() {
    document.body.classList.add(style.bodyclass)

    window.onbeforeunload = function(event){
        document.body.classList.remove(style.bodyclass)
    }

    const [profileImg , setProfileImg] = useState(profile)
    const [search , setSearch] = useState('')

    const [timere , setTimerE] = useState('--:--:--')
    const [exhibPoster , setExhibPoster] = useState(exhibition)
    const [statuse , setStatuse] = useState(true)
    const [statusetext , setStatusetext] = useState('')
    const [entere , setEntere] = useState('#')
    const [profilee , setProfilee] = useState('#')

    const [timera , setTimerA] = useState('--:--:--')
    const [auctionPoster , setAuctionPoster] = useState(mona)
    const [statusa , setStatusa] = useState(false)
    const [statusatext , setStatusatext] = useState('')
    const [entera , setEntera] = useState('#')
    const [asara , setAsara] = useState('#')

    useEffect(()=>{
        if(statuse)
            setStatusetext('درحال برگزاری')
        else
            setStatusetext('شروع نشده')
    } , statuse)

    useEffect(()=>{
        if(statusa)
            setStatusatext('درحال برگزاری')
        else
            setStatusatext('شروع نشده')
    } , statusa)

    const searchHandle = (event) => {
        setSearch(event.target.value)
    }

    const contactHandle = (event) => {
        
    }

    const backeHandle = () => {
        
    }

    const nexteHandle = () => {
        
    }

    const backaHandle = () => {
        
    }

    const nextaHandle = () => {
        
    }

    

  return (
    <div>
        <div className={style.header}>
            <img src={profileImg} alt="" className={style.profile}/>
            <input  type="text" id={style.search} placeholder="Search" onChange={searchHandle}/>
            <button className={style.contact} onClick={contactHandle}>ارتباط با ما</button>
        </div>
        

        <div className={style.showplace}>
            <input className={style.timer} type='text' value={timera}/>
            <img src={back} alt="" className={style.back} onClick={backeHandle}/>
            <div className={style.bannere}>
                <img src={exhibPoster} alt="" className=""/>
            </div>
            <img src={next} alt="" className={style.next} onClick={nexteHandle}/>

            <button id={style.status} className={style.blue} style={{color : statuse ? 'green' : 'red'}}>{statusetext}</button>

            <a href={entere} id={style.enter}>
                <button  className={style.blue}>ورود به نمایشگاه</button> 
            </a>

            <a href={profilee} id={style.profile}>
                <button  className={style.blue}>پروفایل هنرمند</button>
            </a>

        </div>

        <div className={style.auction}>
            <input className={style.timer} type='text' value={timere}/>
            <img src={back} alt="" className={style.backa} onClick={backaHandle}/>
            <div className={style.bannera}>
                <img src={auctionPoster} alt="" className=""/>
            </div>
            <img src={next} alt="" className={style.nexta} onClick={nextaHandle}/>
            <button id={style.statusa} className={style.blue} style={{color : statusa ? 'green' : 'red'}}>{statusatext}</button>
            <a href={entera} id={style.entera}>
                <button className={style.blue}>ورود به مزایده</button>
            </a>
            <a id={style.asara} href={asara}>
                <button className={style.blue}>آثار هنری</button>
            </a>
            <img src={posts} alt="posts" id={style.bpost}/>
        </div>
    </div>
  )
}
