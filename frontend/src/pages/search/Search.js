import { useLocation } from 'react-router-dom'
import Profilelist from '../../component/ProfileList/Profilelist'
import { useFetch } from '../../hooks/useFetch'
import './search.css'

export default function Search() {

  // fetching data using url query

  const queryurl = useLocation().search
  const queryparam = new URLSearchParams(queryurl)
  const query = queryparam.get('q')

  // const url = 'http://localhost:3000/artists?q='+query
  const url = 'http://localhost:3000/artists'
  

  const {data , loading , error}  = useFetch(url)

  const filterprofile = p => (p.artist.profession.includes(query) || p.username.includes(query))

  let results = null

  if(data){
    results = data.filter(filterprofile)
  }


  return (
    <div>
        <p>{query}</p>
        <h2 className="page-title">Profiles including "{query}"</h2>
        {error && <p className='error'>{error}</p>}
        {loading && <p className='loading'>Loading...</p>}
        {data && <Profilelist profiles={results} />}
    </div>
  )
}
