import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function AddCreator() {
  const navigate = useNavigate()
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })
  const [saving, setSaving] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setCreator((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)

    const { error } = await supabase.from('creators').insert({
      name: creator.name,
      url: creator.url,
      description: creator.description,
      imageURL: creator.imageURL || null,
    })

    setSaving(false)

    if (error) {
      console.error('Error adding creator:', error)
      alert('Could not add creator. Check the console for details.')
    } else {
      navigate('/')
    }
  }

  return (
    <main className="container">
      <p>
        <Link to="/">← Back to all creators</Link>
      </p>
      <h1>Add a Creator</h1>

      <form onSubmit={handleSubmit}>
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
            placeholder="https://…"
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
            placeholder="https://…"
          />
        </label>

        <div className="form-actions">
          <button type="submit" aria-busy={saving} disabled={saving}>
            {saving ? 'Adding…' : 'Add Creator'}
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
