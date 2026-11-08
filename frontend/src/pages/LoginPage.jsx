import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../auth/AuthContext'
import FormField from '../components/FormField'
import styles from './AuthForm.module.css'

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setError(null)
        setSubmitting(true)

        try {
            await login(username, password)
            navigate('/', { replace: true })
        } catch (err) {
            if (err.status === 401) {
                setError('Invalid username or password')
            } else {
                setError('Something went wrong, try later')
            }
        } finally {
            setSubmitting(false)
        }
    }

   return (
  <div className={styles.wrapper}>
    <section className={styles.card}>
      <h1 className={styles.title}>Log in</h1>
      <p className={styles.subtitle}>Welcome back. Pick up where you left off.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <FormField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />

        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        {error && <p className={styles.error} role="alert">{error}</p>}

        <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={submitting}>
          {submitting ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <p className={styles.switch}>
        No account yet? <Link to="/register">Create one</Link>
      </p>
    </section>
  </div>
)
}