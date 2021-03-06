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
    // const {data:comments} = useAxios(`https://artcom-sjavanmard.fandogh.cloud/post/comments/${id}/comment_post/`)
    const [count , setCount] = useState(data?.like_count)
    const [addComment, setAddComment] = useState(true)
    
    const {postData:postLike} = useAxios(`https://artcom-sjavanmard.fandogh.cloud/post/${data?.artist.user?.id}/posts/${data?.id}/like/`,'POST');
    const {postData:postDislike} = useAxios(`https://artcom-sjavanmard.fandogh.cloud/post/${data?.artist.user?.id}/posts/${data?.id}/dislike/`,'POST');
    




  const updateaddcomment = () => {
    setAddComment(!addComment)
  }


  const update = useCallback( () => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${JSON.parse(localStorage.getItem("token"))}`
    }

    fetch(url, {headers: headers} )
    .then((response) => response.json())
    .then(newpost => {
        setdata(newpost)
        setlikked(newpost.liked)
    })

    fetch(`https://artcom-sjavanmard.fandogh.cloud/post/comments/${id}/comment_post/`, {headers: headers} )
    .then((response) => response.json())
    .then(comm => {
        console.log(comm)
        setComments(comm)
    })
  } , [id, url])




  useEffect(() => {
    update()
  } , [addComment , likked, update])





  const close = (e) => {
    if(e.target.className === ('modal-backdrop'))
      handleClose()
      
  }

  const likehandler = () => {
    if (data?.liked) {
      setlikked(false);
      setCount((prevcount)=>prevcount-1)
      postDislike();
    } else {
      setlikked(true);
      setCount((prevcount)=>prevcount+1)
      postLike();
    }
  };







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
                    <b title='?????? ??????'>{data.name}</b>
                    {data.for_sale && <img src={buy} alt='bought' title='???????? ???????? ???????????? ??????' style={{cursor: "auto"}} />}
                    {!data.for_sale && <img src={notbuy} alt='not bought' title='???????? ???????? ???????????? ???????? ??????' />}
                    {/* {data.liked && <img src={liked} onClick={likehandler} alt='liked' title='????  ????????????????' />}
                    {!data.liked && <img src={notliked}  onClick={likehandler} alt='not liked' title='???? ??????????????'/>} */}

                    {likked && <img src={liked} onClick={likehandler} alt='liked' title='????  ????????????????' />}
                    {!likked && <img src={notliked}  onClick={likehandler} alt='not liked' title='???? ??????????????'/>}
                    
                    <b title='??????????  ???????? ????'>{data?.like_count} <hr></hr>?????? ?????????????? ??????</b> 
                    {data.sold && <img src={sold} alt='sold' title='???????????? ??????' />}

                  </div>
                  <div className='content'>
                    <b>??????:</b>
                    <p>{data.description}</p>
                    <hr></hr>
                    <b>??????????:</b>
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
