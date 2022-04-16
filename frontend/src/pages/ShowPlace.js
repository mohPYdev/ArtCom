import style from './ShowPlace.module.css'
import frame from '../img/frame.png'
import profile from '../img/profile.png'
import back from '../img/back.png'
import like from '../img/like.png'
import next from '../img/next.png'
import liveeye from '../img/liveeye.png'
import seeneye from '../img/seeneye.png'


export default function ShowPlace() {
    document.body.classList.add(style.bodyclass)

    window.onbeforeunload = function(event){
        document.body.classList.remove(style.bodyclass)
    }

  return (
    <div>
        <img src={frame} alt="frame" id={style.frame}/>
        <div>
            <img src={profile} alt="" id={style.profile}/>
            <p id={style.about}>ایدهٔ این‌که پروانه‌ای می‌تواند باعث تغییری آشوبی شود نخستین بار در ۱۹۵۲ در داستان کوتاهی به نام آوای تندر اثر ری بردبری مطرح شد. عبارت «اثر پروانه‌ای» هم در ۱۹۶۱ در پی مقاله‌ای از ادوارد لورنتس به وجود آمد. وی در صد و سی و نهمین ؟»</p>
        </div>

        <div>
            <h2 id={style.title}>نام</h2>
            <p id={style.title}>--------</p>
            <h2 id={style.title}>قیمت</h2>
            <p id={style.title}>--,--,--</p>
            <h2 id={style.title}>تاریخ</h2>
            <p id={style.title}>--/--/--</p>
        </div>
        
        <div>
            <img src={back} alt="back"  id={style.back}/>
            <img src={like} id={style.like} alt=""/>
            <p id={style.count}>--</p>
            <img src={next} alt="next" id={style.next}/>
        </div>

        <div>
            <button class={style.btn}>خروج</button>
            <button class={style.btn}>خرید</button>
            <button class={style.btn}>پخش/توقف</button>
        </div>
        <div>
            <img src={liveeye} alt="" id={style.liveimg}/>
            <p id={style.livecount}>--</p>
        </div>
        <div>
            <img src={seeneye} alt="" id={style.seenimg}/>
            <p id={style.seencount}>--</p>
        </div>
    </div>
  )
}
