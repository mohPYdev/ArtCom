import './Comment_Input.css'
import { useState } from 'react'
import {useAxios} from '../../hooks/useAxios'

export default function CommentInput({id, update}) {

    const [comment  ,setcomm] = useState('')

    const { postData} = useAxios('http://localhost:8000/post/comments/', 'POST')

    const post_comment = (e) => {
        e.preventDefault()
        postData({'text':comment, 'post':id})
        setcomm('')
        update()
      }

  return (
    <div className='comment_input'>
        <form onSubmit={post_comment}>
            <input
                type='text'
                required
                onChange={e => setcomm(e.target.value)}
                value={comment}
                placeholder='نظر خود را اینجا بنویسید ...'
            />
        </form>
    </div>
  )
}
