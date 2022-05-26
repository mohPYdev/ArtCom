import {React , useEffect, useState} from 'react';
import './add_exhibition.css';
import exhiPic from '../img/exhibition.png';
import Multiselect from 'multiselect-react-dropdown';

import moment from 'jalali-moment';

import {useAxios} from '../hooks/useAxios';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Add_Exhibition(){

    const {data:posts} = useAxios('http://localhost:8000/post/posts');
    const alert = useAlert();

    
    const {user} = useAuthContext();
    const [validPosts, setValidPosts] = useState([]);

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
    const[selectedPosts ,setSelectedPost] = useState([]);

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



    const onSelect = (selectedList, selectedItem) => {
        setSelectedPost(selectedPosts => [...selectedPosts, parseInt(selectedItem.id)]);
    }

    const onRemove = (selectedList, selectedItem) => {
        setSelectedPost(selectedPosts => selectedPosts.filter(item => item !== parseInt(selectedItem.id)));
    }



    useEffect(() => {
        if (posts){
            setValidPosts(validPosts => [...validPosts, ...posts.filter(post => post.for_sale === true && post.artist.user.id == user.id)]);
        }
    }, [posts, user])




    const handlesubmit=(e)=>{
        e.preventDefault();

        const date = `${year_date_addex}-${month_date_addex}-${day_date_addex}`;

        const start = moment.from(date, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD');
        const end = moment(start).add(2, 'day').locale('en').format('YYYY-MM-DD');

        const time = `${hour_date_addex}:${minute_date_addex}:00`;

        const start_date = `${start} ${time}`;
        const end_date = `${end} ${time}`;


        const formData = new FormData();
        formData.append('title', title_addex);
        formData.append('date_begin', start_date);
        formData.append('date_end', end_date);
        formData.append('cover', selectedImage);

        let url = 'http://localhost:8000/post/exhibitions/';
        axios.post(url, formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
        })
        .then(res => {
            url += res.data.id + '/';
            axios.patch(url, {'posts': selectedPosts, 'date_begin': start_date, 'date_end': end_date} , {
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res2 => {
                console.log(res2)
                alert.success('اطلاعات با موفقیت ثبت شد')
          })
          .catch(err => console.log(err))  
            console.log(res.data)       
        })
        .catch(err => console.log(err))

    }




    return(
        <div className='main_div_addex'>

            {/*adding page title*/}
            <div id='p_addex'>
                <p>
                    <b><u> ساخت نمایشگاه جدید </u></b>
                </p>
            </div>
            
            <form onSubmit={handlesubmit} id='form_addex' method="get">
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
                { validPosts && <Multiselect id='postselect_addex'
                options= {validPosts} // Options to display in the dropdown
                onSelect={onSelect} // Function will trigger on select event
                onRemove={onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                showArrow={true}
                showCheckbox={true}
                placeholder=" انتخاب آثار "
                />}

                <input type="submit" id='submit_addex' name='submit_addex' value='ایجاد'/>
            </form>
        </div>
    )
}