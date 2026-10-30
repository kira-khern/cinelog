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
        <section className={styles.container}>
            <h1>Log in</h1>

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

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.button} disabled={submitting}>
                    {submitting ? 'Logging in...' : 'Log in'}
                </button>
            </form>

            <p>
                No account yet? <Link to="/register">Register</Link>
            </p>
        </section>
    )
}