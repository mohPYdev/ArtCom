import './Comment_Input.css'
import { useState } from 'react'

export default function Comment_Input() {

    const [comment  ,setcomm] = useState('')

    const post_comment = (e) => {
        e.preventDefault()
        //add comment
        console.log(comment)
        setcomm('')
      }

  return (
    <div className='comment_input'>
        <form onSubmit={post_comment}>
            <input
                type='text'
                required
                onChange={e => setcomm(e.target.value)}
                value={comment}
                placeholder='Write your Comment here ...'
            />
        </form>
    </div>
  )
}
