import { Link } from 'react-router-dom'
import './NavBar.css'
import Searchbar from '../Searchbar/Searchbar'

export default function NavBar() {
  return (
    <div className='navbar'>
        <nav>
            <Link to='/' className='brand'>
                <h1>Home !!</h1>
            </Link>
            <Searchbar />
        </nav>
    </div>
  )
}
