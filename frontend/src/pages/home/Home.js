import './Home.css'
import { useFetch } from '../../hooks/useFetch'
import Postlist from '../../component/postlist/Postlist'

export default function Home() {

  const { data , loading , error } = useFetch('http://localhost:3000/posts')

  return (
    <div className='home'>
        {error && <p className='error'>{error}</p>}
        {loading && <p className='loading'>Loading...</p>}
        {data && <Postlist posts={data} />}
    </div>
  )
}
