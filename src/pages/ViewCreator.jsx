import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function ViewCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching creator:', error)
      } else {
        setCreator(data)
      }
      setLoading(false)
    }

    fetchCreator()
  }, [id])

  if (loading) {
    return (
      <main className="container">
        <p aria-busy="true">Loading…</p>
      </main>
    )
  }

  if (!creator) {
    return (
      <main className="container">
        <div className="empty-state">
          <h2>Creator not found</h2>
          <Link to="/" role="button">
            ← Back home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container">
      <p>
        <Link to="/">← Back to all creators</Link>
      </p>

      <article>
        {creator.imageURL && (
          <img
            className="card-image"
            src={creator.imageURL}
            alt={creator.name}
          />
        )}
        <h1>{creator.name}</h1>
        <p>
          <a href={creator.url} target="_blank" rel="noopener noreferrer">
            {creator.url} ↗
          </a>
        </p>
        <p>{creator.description}</p>

        <footer className="form-actions">
          <Link to={`/edit/${creator.id}`} role="button">
            Edit
          </Link>
          <button className="secondary" onClick={() => navigate('/')}>
            Done
          </button>
        </footer>
      </article>
    </main>
  )
}
