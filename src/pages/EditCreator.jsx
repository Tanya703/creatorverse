import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching creator:', error)
      } else if (data) {
        setCreator({
          name: data.name ?? '',
          url: data.url ?? '',
          description: data.description ?? '',
          imageURL: data.imageURL ?? '',
        })
      }
      setLoading(false)
    }

    fetchCreator()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setCreator((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from('creators')
      .update({
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL || null,
      })
      .eq('id', id)

    setSaving(false)

    if (error) {
      console.error('Error updating creator:', error)
      alert('Could not update creator. Check the console for details.')
    } else {
      navigate('/')
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete ${creator.name}? This cannot be undone.`
    )
    if (!confirmed) return

    const { error } = await supabase.from('creators').delete().eq('id', id)

    if (error) {
      console.error('Error deleting creator:', error)
      alert('Could not delete creator. Check the console for details.')
    } else {
      navigate('/')
    }
  }

  if (loading) {
    return (
      <main className="container">
        <p aria-busy="true">Loading…</p>
      </main>
    )
  }

  return (
    <main className="container">
      <p>
        <Link to="/">← Back to all creators</Link>
      </p>
      <h1>Edit Creator</h1>

      <form onSubmit={handleUpdate}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={creator.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          URL
          <input
            type="url"
            name="url"
            value={creator.url}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={creator.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </label>

        <label>
          Image URL (optional)
          <input
            type="url"
            name="imageURL"
            value={creator.imageURL}
            onChange={handleChange}
          />
        </label>

        <div className="form-actions">
          <button type="submit" aria-busy={saving} disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
          <button type="button" className="contrast" onClick={handleDelete}>
            Delete
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  )
}
