import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Searchbar.css'


export default function Searchbar() {
    const [val , setval] = useState('')
    const nav = useNavigate()

    const search =(e) => {
        e.preventDefault()
        nav(`/search?q=${val}`)
    }

  return (
    <div className='searchbar'>
        <form onSubmit={search}>
            <label htmlFor='search'>Search</label>
            <input
                    type='text'
                    required
                    onChange={e => setval(e.target.value)}
                    id='search'
                />
        </form>
    </div>
  )
}
