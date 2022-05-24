import './post.css'
import { useFetch } from '../../hooks/useFetch'
import { useState } from 'react'
import { useAxios } from '../../hooks/useAxios'

export default function Post({ handleClose , id}) {

  const [comment  ,setcomm] = useState('')

    const url = 'http://localhost:8000/post/posts/' + id
  const {data , loading , error} = useAxios(url)

  const close = (e) => {
    if(e.target.className === ('modal-backdrop'))
      handleClose()
  }

  const post_comment = (e) => {
    e.preventDefault()
    //add comment
    console.log(comment)
    setcomm('')
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
                <form onSubmit={post_comment}>
                  <input
                    type='text'
                    required
                    onChange={e => setcomm(e.target.value)}
                    value={comment}
                  />
                </form>
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
