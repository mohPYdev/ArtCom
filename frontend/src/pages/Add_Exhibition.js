import {React , useEffect, useState} from 'react';
import './add_exhibition.css';
import mainPic from '../img/Verano Fresco Pequeño Fronteras PNG , Frontera De Verano, Fronteras De Plantas, Frontera De Vides PNG y PSD para Descargar Gratis _ Pngtree.jpg';
import exhiPic from '../img/exhibition.png';

export default function Add_Exhibition(){
    document.body.classList.add('bodyClass_addex');
    window.onbeforeunload = function (e) {
      document.body.classList.remove('bodyClass_addex');
    }

    //file button
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(exhiPic);
    useEffect(() => {
        if (selectedImage) {
        setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);
    //

    const[title_addex, set_title_addex] = useState('');
    const[year_date_addex, set_year_date_addex] = useState('');
    const[month_date_addex, set_month_date_addex] = useState('');
    const[day_date_addex, set_day_date_addex] = useState('');
    const[hour_date_addex, set_hour_date_addex] = useState('');
    const[minute_date_addex, set_minute_date_addex] = useState('');
    const[postselect_addex, set_postselect_addex] = useState('');

    const changeExhibitionTitle=(event)=>{
        set_title_addex(event.target.value)
    }
    const changeYear=(event)=>{
        set_year_date_addex(event.target.value)
    }
    const changeMonth=(event)=>{
        set_month_date_addex(event.target.value)
    }
    const changeDay=(event)=>{
        set_day_date_addex(event.target.value)
    }
    const changeHour=(event)=>{
        set_hour_date_addex(event.target.value)
    }
    const changeMinute=(event)=>{
        set_minute_date_addex(event.target.value)
    }
    const changePosts=(event)=>{
        set_postselect_addex(event.target.value)
    }
    const submitting=(event)=>{
        event.preventDefault();
    }

    return(
        <div className='main_div'>
            {/* <!--adding page background image--> */}
            <div id='img_back_addex'>
                <img src={mainPic}/>
            </div>

            {/*adding page title*/}
            <div id='p_addex'>
                <p>
                    <b><u> ساخت نمایشگاه جدید </u></b>
                </p>
            </div>
            
            <form onSubmit={submitting} id='form_addex' method="get">
                {/* <!--adding exhibition image--> */}
                <div id='img_exhi_addex'>
                    <img id='exhi_image_addex' src={imageUrl} />
                    <label id="img_exhi_label_addex" for="img_exhi_btn_addex">
                        کاور نمایشگاه +
                        <input accept="image/*" type="file" id="img_exhi_btn_addex" onChange={e => setSelectedImage(e.target.files[0])} />
                    </label>
                </div>

                {/*adding exhibition title*/}
                <input value={title_addex} onChange={changeExhibitionTitle} type="text" id='title_addex' name='title_addex' placeholder='عنوان نمایشگاه' />

                {/*adding date*/}
                <fieldset id="date_addex">
                    <legend>:تاریخ شروع نمایشگاه</legend>
                    <select value={year_date_addex} onChange={changeYear} className='date_addex'>
                        <option value=" " hidden>سال</option>
                        <option value=" " disabled selected>سال</option>
                        {(()=>{
                            const items=[];
                            for(let i =1401; i<=1403;i++){
                                items.push((<option>{i}</option>));
                            }
                            return items;
                        })()}
                    </select>
                    <select value={month_date_addex} onChange={changeMonth} className='date_addex'>
                        <option value=" " hidden>ماه</option>
                        <option value=" " disabled selected>ماه</option>
                        {(()=>{
                            const items=[];
                            for(let i =1; i<=12;i++){
                                items.push((<option>{i}</option>));
                            }
                            return items;
                        })()}
                    </select>
                    <select value={day_date_addex} onChange={changeDay} className='date_addex'>
                        <option value=" " hidden>روز</option>
                        <option value=" " disabled selected>روز</option>
                        {(()=>{
                            const items=[];
                            for(let i =1; i<=31;i++){
                                items.push((<option>{i}</option>));
                            }
                            return items;
                        })()}
                    </select>
                    <select value={hour_date_addex} onChange={changeHour} className='date_addex'>
                        <option value=" " hidden>ساعت</option>
                        <option value=" " disabled selected>ساعت</option>
                        {(()=>{
                            const items=[];
                            for(let i =0; i<=23;i++){
                                items.push((<option>{i}</option>));
                            }
                            return items;
                        })()}
                    </select>
                    <select value={minute_date_addex} onChange={changeMinute} className='date_addex'>
                        <option value=" " hidden>دقیقه</option>
                        <option value=" " disabled selected>دقیقه</option>
                        {(()=>{
                            const items=[];
                            for(let i =0; i<=45;i+=15){
                                items.push((<option>{i}</option>));
                            }
                            return items;
                        })()}
                    </select>
                </fieldset>

                {/*adding posts*/}
                <select value={postselect_addex} onChange={changePosts} name='postselect_addex' id='postselect_addex' >
                    <option value="4" hidden >انتخاب پست ها</option>
                    <option value="4" disabled selected>انتخاب پست ها</option>
                    <option value='1'>پست 1</option>
                    <option value='2'>پست 2</option>
                    <option value='3'>پست 3</option>
                </select>

                <input type="submit" id='submit_addex' name='submit_addex' value='ایجاد'/>
            </form>
        </div>
    )
}