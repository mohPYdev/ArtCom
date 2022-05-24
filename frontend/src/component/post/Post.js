import './post.css'
import { useAxios } from '../../hooks/useAxios'
import CommentInput from '../comment_input/CommentInput'
import liked from '../../img/liked.png'
import notliked from '../../img/notliked.png'
import sold from '../../img/sold.png'
import buy from '../../img/buy.png'
import notbuy from '../../img/notbuy.png'
import { useState } from 'react'

export default function Post({ handleClose , id}) {

    const url = 'http://localhost:8000/post/posts/' + id
  
    // test
    const [likked , setlikked] = useState(false)
  let {data , loading , error} = useAxios(url)

  const {data:comments} = useAxios(`http://localhost:8000/post/comments/${id}/comment_post/`)

  const close = (e) => {
    if(e.target.className === ('modal-backdrop'))
      handleClose()
  }

  const likehandler = () => {
    setlikked(!likked)
  }


  return (
    <div className="modal-backdrop" onClick={((e) => close(e, data))}>
      <div className="modal">
          {loading && <p>loading....</p>}
          {error && <p>{error}</p>}
          {data && 
            <div className='flex-container'>
                <img alt='post-img' src={data.image} />
                <div className='details'>
                  <div className='first-row'>
                    <b title='نام اثر'>{data.name}</b>
                    {data.for_sale && <img src={buy} alt='bought' title='برای فروش گذاشته شده' />}
                    {!data.for_sale && <img src={notbuy} alt='not bought' title='برای فروش گذاشته نشده است' />}
                    {/* {data.liked && <img src={liked} onClick={likehandler} alt='liked' title='🗿  نپسندیدم' />}
                    {!data.liked && <img src={notliked}  onClick={likehandler} alt='not liked' title='🍠 پسندیدم'/>} */}

                    {likked && <img src={liked} onClick={likehandler} alt='liked' title='🗿  نپسندیدم' />}
                    {!likked && <img src={notliked}  onClick={likehandler} alt='not liked' title='🍠 پسندیدم'/>}
                    
                    <b title='تعداد  لایک ها'>{data.like_count} <hr></hr>نفر پسندیده اند</b> 
                    {data.sold && <img src={sold} alt='sold' title='فروخته شده' />}

                  </div>
                  <div className='content'>
                    <b>شرح:</b>
                    <p>{data.description}</p>
                    <hr></hr>
                    <b>نظرات:</b>
                    <div className='comments'>
                      {comments  && comments.map(c => (
                        <div key={c.id}>
                            <p><b>{c.user}</b> : {c.text}</p>
                            <p></p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <CommentInput />
                </div>
            </div>
          }
      </div>
    </div>
  )
}
