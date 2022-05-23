import './Profilelist.css'

export default function Profilelist({ profiles }) {

  return (
    <div className='profile-list'>
        {profiles.map(p => (
          <a href={`/psa/${p.id}`}>
            <div key={p.id} className='profile' >
                <img src={p.image} alt='profile-img' />
                <p>{p.username}</p>
                <p>{p.artist.profession}</p>
            </div>
          </a>
        ))}
    </div>
  )
}
