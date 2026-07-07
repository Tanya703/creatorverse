import { Link } from 'react-router-dom'

// Displays a single content creator's info on a card.
export default function Card({ creator }) {
  const { id, name, url, description, imageURL } = creator

  return (
    <article className="creator-card">
      {imageURL && (
        <img className="card-image" src={imageURL} alt={name} />
      )}
      <div className="card-body">
        <h3>{name}</h3>
        <p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Visit channel ↗
          </a>
        </p>
        <p>{description}</p>
        <div className="card-actions">
          <Link to={`/creators/${id}`} role="button" className="secondary">
            View
          </Link>
          <Link to={`/edit/${id}`} role="button" className="contrast outline">
            Edit
          </Link>
        </div>
      </div>
    </article>
  )
}
