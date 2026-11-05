import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { searchTitles } from '../api/titles'
import TitleCard from '../components/TitleCard'
import styles from './SearchPage.module.css'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [input, setInput] = useState(query)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setInput(query)
  }, [query])

  useEffect(() => {
    if (!query) {
      setResults([])
      setError(null)
      return
    }

    let ignore = false
    setLoading(true)
    setError(null)

    searchTitles(query)
      .then((data) => {
        if (!ignore) {
          setResults(data)
        }
      })
      .catch((err) => {
        if (!ignore) {
          if (err.status === 503) {
            setError(err.message)
          } else {
            setError('Something went wrong. Please try again.')
          }
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [query])

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = input.trim()
    if (trimmed) {
      setSearchParams({ q: trimmed })
    }
  }

  return (
    <section>
      <h1>Search</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className="input"
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search movies and series..."
          maxLength={100}
          aria-label="Search movies and series"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {loading && <p className={styles.status}>Searching...</p>}

      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && query && results.length === 0 && (
        <p className={styles.status}>No results for "{query}".</p>
      )}

      {!loading && !error && results.length > 0 && (
        <div className={styles.grid}>
          {results.map((title) => (
            <TitleCard key={`${title.mediaType}-${title.tmdbId}`} title={title} />
          ))}
        </div>
      )}
    </section>
  )
}