import './Profilelist.css'

export default function Profilelist({ profiles }) {

  return (
    <div className='profile-list'>
        {profiles.map(p => (
          <a key={p.id} href={`/psa/${p.id}`}>
            <div key={p.id} className='profile' >
                <img src={p.image} alt='profile-img' />
                <h3>{p.username}</h3>
                <p>{p.artist.profession}</p>
            </div>
          </a>
        ))}
    </div>
  )
}
