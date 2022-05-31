import { Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import Profilelist from '../../component/ProfileList/Profilelist'
import SearchComp from './SearchComp'
import { useFetch } from '../../hooks/useFetch'
import style from './search.module.css'

import { useAxios } from '../../hooks/useAxios'

export default function Search() {

  // fetching data using url query

  const queryurl = useLocation().search
  const queryparam = new URLSearchParams(queryurl)
  let query = queryparam.get('q')

  // const url = 'http://localhost:3000/artists?q='+query
  const url = 'http://artcom-sjavanmard.fandogh.cloud/auth/users/artist_list/'
  

  const {data , loading , error}  = useAxios(url)

  query = query.toUpperCase()

  const filterprofile = p => (p.artist.profession.toUpperCase().includes(query) || p.username.toUpperCase().includes(query) || p.first_name.toUpperCase().includes(query) || p.last_name.toUpperCase().includes(query))

  let results = null

  if(data){
    results = data.filter(filterprofile)
  }


  document.body.className = style.bodyclass;

  window.onbeforeunload = function (event) {
    document.body.classList.remove(style.bodyclass);
  };

  return (
    <div className={style.search_list}>
        <Navbar className={style.navbar}>
          <Link className={style.link} to='/home'>صفحه اصلی</Link>
          <SearchComp />
        </Navbar>
        <h2 className="page-title">Profiles including "{query.toLowerCase()}"</h2>
        {error && <p className='error'>{error}</p>}
        {loading && <p className='loading'>Loading...</p>}
        {data && <Profilelist profiles={results} />}
    </div>
  )
}
