import { useNavigate } from 'react-router-dom';
import './Searchbar.css'
import { useState } from 'react';

export default function SearchBar() {

    const [searchval, setSearch] = useState('');
    const nav = useNavigate()

    const search = (e) => {
        e.preventDefault()
        nav(`/search?q=${searchval}`)
    }


  return (
    <div>
        <form id='search_bar' onSubmit={search}>
            <input
            type="text"
            placeholder="جست و جو"
            value={searchval}
            onChange={e => setSearch(e.target.value)}
            />
        </form>
    </div>
  )
}
