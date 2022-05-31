import './post.css'
import { useAxios } from '../../hooks/useAxios'
import CommentInput from '../comment_input/CommentInput'
import liked from '../../img/liked.png'
import notliked from '../../img/notliked.png'
import sold from '../../img/sold.png'
import buy from '../../img/buy.png'
import notbuy from '../../img/notbuy.png'
import { useEffect, useState, useCallback } from 'react'

export default function Post({ handleClose , id}) {

    const url = 'https://artcom-sjavanmard.fandogh.cloud/post/posts/' + id
  
    // test
    const [likked , setlikked] = useState(null)
    const {loading , error} = useAxios(url)
    const [data , setdata] = useState(null)
    const [comments, setComments] = useState(null)
    const [count , setCount] = useState(data?.like_count)
    const [addComment, setAddComment] = useState(false)
    
    const {postData:postLike} = useAxios(`https://artcom-sjavanmard.fandogh.cloud/post/${data?.artist.user?.id}/posts/${data?.id}/like/`,'POST');
    const {postData:postDislike} = useAxios(`https://artcom-sjavanmard.fandogh.cloud/post/${data?.artist.user?.id}/posts/${data?.id}/dislike/`,'POST');
    

useEffect(()=>{
console.log(data)
},[])



  const updateaddcomment = () => {
    setAddComment(!addComment)
  }




  useEffect(() => {
    update()
  } , [addComment , likked])





  const close = (e) => {
    if(e.target.className === ('modal-backdrop'))
      handleClose()
      
  }

  const likehandler = () => {
    if (data?.liked) {
      setlikked(false);
      // setCount((prevcount)=>prevcount-1)
      postDislike();
    } else {
      setlikked(true);
      // setCount((prevcount)=>prevcount+1)
      postLike();
    }
  };


  const update =  () => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
    }

    fetch(url, {headers: headers} )
    .then((response) => response.json())
    .then(newpost => {
        setdata(newpost)
    })

    fetch(`https://artcom-sjavanmard.fandogh.cloud/post/comments/${id}/comment_post/`, {headers: headers} )
    .then((response) => response.json())
    .then(comm => {
        console.log(comm)
        setComments(comm)
    })
  }




  return (
    <div className="modal-backdrop" onClick={((e) => close(e, data))}>
      <div className="modal">
          {loading && <p>loading....</p>}
          {error && <p>{error}</p>}
          {data && 
            <div className='flex-container'>
                <img alt='post-img' src={data.image}  className='post_img'/>
                <div className='details'>
                  <div className='first-row'>
                    <b title='نام اثر'>{data.name}</b>
                    {data.for_sale && <img src={buy} alt='bought' title='برای فروش گذاشته شده' style={{cursor: "auto"}} />}
                    {!data.for_sale && <img src={notbuy} alt='not bought' title='برای فروش گذاشته نشده است' />}
                    {/* {data.liked && <img src={liked} onClick={likehandler} alt='liked' title='🗿  نپسندیدم' />}
                    {!data.liked && <img src={notliked}  onClick={likehandler} alt='not liked' title='🍠 پسندیدم'/>} */}

                    {data?.liked && <img src={liked} onClick={likehandler} alt='liked' title='🗿  نپسندیدم' />}
                    {!data.liked && <img src={notliked}  onClick={likehandler} alt='not liked' title='🍠 پسندیدم'/>}
                    
                    <b title='تعداد  لایک ها'>{data?.like_count} <hr></hr>نفر پسندیده اند</b> 
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
                        </div>
                      ))}
                    </div>
                  </div>
                  <CommentInput id={data.id} updateaddcomment={updateaddcomment} />
                </div>
            </div>
          }
      </div>
    </div>
  )
}
