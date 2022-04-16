import style from './HomePage.module.css'
import profile from '../img/profile--picture.png'
import back from '../img/back.png'
import exhibition from '../img/exhibition.png'
import next from '../img/next.png'
import mona from '../img/mona.png'
import posts from '../img/posts.png'

export default function HomePage() {
    document.body.classList.add(style.bodyclass)

    window.onbeforeunload = function(event){
        document.body.classList.remove(style.bodyclass)
    }

  return (
    <div>
        <div className={style.header}>
            <img src={profile} alt="" className={style.profile}/>
            <input  type="text" id={style.search} placeholder="Search"/>
            <button className={style.contact}>ارتباط با ما</button>
        </div>
        

        <div className={style.showplace}>
            <h1 className={style.timer}>--:--:--</h1>
            <img src={back} alt="" className={style.back}/>
            <div className={style.bannere}>
                <img src={exhibition} alt="" className=""/>
            </div>
            <img src={next} alt="" className={style.next}/>
            <button id={style.status} className={style.blue}>وضعیت</button>
            {/* <Link to='./ShowPlace'> */}
                <button id={style.enter} className={style.blue}>ورود به نمایشگاه</button> 
            {/* </Link> */}
            <button id={style.profile} className={style.blue}>پروفایل هنرمند</button>
        </div>

        <div className={style.auction}>
            <h1 className={style.timer}>--:--:--</h1>
            <img src={back} alt="" className={style.backa}/>
            <div className={style.bannera}>
                <img src={mona} alt="" className=""/>
            </div>
            <img src={next} alt="" className={style.nexta}/>
            <button id={style.statusa} className={style.blue}>وضعیت</button>
            <button id={style.entera} className={style.blue}>ورود به مزایده</button>
            <button id={style.asara} className={style.blue}>آثار هنری</button>
            <img src={posts} alt="posts" id={style.bpost}/>
        </div>
    </div>
  )
}
