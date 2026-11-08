import { posterUrl } from '../utils/tmdb'
import styles from './TitleCard.module.css'

const MEDIA_TYPE_LABELS = {
  MOVIE: 'Movie',
  SERIES: 'Series',
}

export default function TitleCard({ title, rating }) {
  const poster = posterUrl(title.posterPath)

  return (
    <article className={styles.card}>
      <div className={styles.posterWrapper}>
        {poster ? (
          <img className={styles.poster} src={poster} alt={`Poster of ${title.title}`} loading="lazy" />
        ) : (
          <div className={styles.placeholder}>
            <span>{title.title}</span>
          </div>
        )}

        {rating != null && (
          <span className={styles.rating} aria-label={`Rated ${rating / 2} out of 5`}>
            ★ {(rating / 2).toFixed(1)}
          </span>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title} title={title.title}>{title.title}</h3>
        <div className={styles.meta}>
          <span>{title.releaseYear ?? '—'}</span>
          <span className={styles.type}>{MEDIA_TYPE_LABELS[title.mediaType]}</span>
        </div>
      </div>
    </article>
  )
}