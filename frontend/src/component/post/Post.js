import './post.css'
import { useFetch } from '../../hooks/useFetch'
import { useState } from 'react'
import Comment_Input from '../comment_input/Comment_Input'

export default function Post({ handleClose , id}) {

    const url = 'http://localhost:3000/posts/' + id
  const {data , loading , error} = useFetch(url)

  const close = (e) => {
    if(e.target.className === ('modal-backdrop'))
      handleClose()
  }


  return (
    <div className="modal-backdrop" onClick={((e) => close(e, data))}>
      <div className="modal">
          {loading && <p>loading....</p>}
          {error && <p>{error}</p>}
          {data && 
            <div>
                <img alt='post-img' src={data.image} />
                <h4>Name:</h4>
                <p>{data.name}</p>
                <h4>Description:</h4>
                <p>{data.description}</p>
                <h4>Comments:</h4>
                <Comment_Input />
                {data.comments.length !==0 && data.comments.map(c => (
                    <div key={c.id}>
                        <p><b>{c.username}</b> : {c.text}</p>
                        <p></p>
                    </div>
                ))}
            </div>
          }
      </div>
    </div>
  )
}
