import './Comment_Input.css'
import { useState } from 'react'
import {useAxios} from '../../hooks/useAxios'

export default function CommentInput({id , updateaddcomment}) {

    const [comment  ,setcomm] = useState('')

    const { postData} = useAxios('https://artcom-sjavanmard.fandogh.cloud/post/comments/', 'POST')

    const post_comment = (e) => {
        e.preventDefault()
        postData({'text':comment, 'post':id})
        setcomm('')
        console.log(comment)
        updateaddcomment()
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
