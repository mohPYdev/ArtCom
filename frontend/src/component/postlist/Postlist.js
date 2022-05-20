import { useState } from 'react'
import './postlist.css'
import Post from '../post/Post'

export default function Postlist({ posts }) {
    const [showpost , setShowpost] = useState(false)
    const [post_id , setpost_id] = useState(null)

    const go = (id) => {
        setpost_id(id)
        setShowpost(true)
    }

    const handleClose = () => {
        setShowpost(false)
      }

    //   if(posts.length === 0)
    //     return <div className='error'>No posts found ...</div>

  return (
    <div className='post-list'>
        {posts.map(p => (
            <div key={p.id} className='post' onClick={() => {go(p.id)}}>
                <img src={p.image} alt='post-img' />
            </div>
        ))}
        {showpost && <Post handleClose={handleClose} id={post_id} />}
    </div>
  )
}
