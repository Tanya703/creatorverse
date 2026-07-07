import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import Card from '../components/Card'

export default function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .order('id', { ascending: true })

      if (error) {
        console.error('Error fetching creators:', error)
      } else {
        setCreators(data)
      }
      setLoading(false)
    }

    fetchCreators()
  }, [])

  return (
    <main className="container">
      <header className="app-header">
        <h1>💫 Creatorverse</h1>
        <p>Content creators worth following.</p>
      </header>

      <div className="toolbar">
        <Link to="/new" role="button">
          + Add Creator
        </Link>
      </div>

      {loading ? (
        <p aria-busy="true">Loading creators…</p>
      ) : creators.length === 0 ? (
        <div className="empty-state">
          <h2>No creators yet</h2>
          <p>Add your first content creator to get started!</p>
        </div>
      ) : (
        <div className="card-grid">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </main>
  )
}
