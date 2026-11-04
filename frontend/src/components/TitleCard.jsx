import { posterUrl } from '../utils/tmdb'
import styles from './TitleCard.module.css'

const MEDIA_TYPE_LABELS = {
  MOVIE: 'Movie',
  SERIES: 'Series',
}

export default function TitleCard({ title }) {
  const poster = posterUrl(title.posterPath)

  return (
    <article className={styles.card}>
      {poster ? (
        <img className={styles.poster} src={poster} alt={`Poster of ${title.title}`} loading="lazy" />
      ) : (
        <div className={styles.placeholder}>No poster</div>
      )}

      <div className={styles.info}>
        <h3 className={styles.title}>{title.title}</h3>
        <p className={styles.meta}>
          {title.releaseYear ?? 'Unknown year'} · {MEDIA_TYPE_LABELS[title.mediaType]}
        </p>
      </div>
    </article>
  )
}