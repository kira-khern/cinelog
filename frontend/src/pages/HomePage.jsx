import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../auth/AuthContext'
import styles from './HomePage.module.css'

const FEATURES = [
  {
    title: 'Discover',
    text: 'Search millions of movies and series, with posters and details from TMDB.',
    ready: true,
  },
  {
    title: 'Rate & review',
    text: 'Give half-star ratings, write short reviews and keep a diary of what you watched.',
    ready: false,
  },
  {
    title: 'Follow friends',
    text: 'Follow people whose taste you trust and see their latest reviews in your feed.',
    ready: false,
  },
]

export default function HomePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleSearch(event) {
    event.preventDefault()
    const trimmed = query.trim()
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    }
  }

  return (
    <>
      <section className={styles.hero}>
        <span className="chip">Your film diary</span>

        <h1 className={styles.title}>
          Seen it?<br />
          <span className={styles.highlight}>Rate it</span>
        </h1>

        <p className={styles.lead}>
          A place to rate movies and series, write about them and see what your friends are watching.
        </p>

        <form onSubmit={handleSearch} className={styles.search}>
          <input
            className="input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie or series..."
            maxLength={100}
            aria-label="Search movies and series"
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        <div className={styles.actions}>
          {user ? (
            <>
              <Link to="/search" className="btn btn-secondary">Browse titles</Link>
              <Link to="/profile" className="btn btn-secondary">Your profile</Link>
            </>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary">Create account</Link>
              <Link to="/login" className="btn btn-secondary">Log in</Link>
            </>
          )}
        </div>
      </section>

      <section className={styles.features} aria-label="Features">
        {FEATURES.map((feature) => (
          <article key={feature.title} className={`glass ${styles.feature}`}>
            <div className={styles.featureHeader}>
              <h2 className={styles.featureTitle}>{feature.title}</h2>
              {!feature.ready && <span className="chip">Coming soon</span>}
            </div>
            <p className={styles.featureText}>{feature.text}</p>
          </article>
        ))}
      </section>
    </>
  )
}