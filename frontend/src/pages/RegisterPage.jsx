import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../auth/AuthContext'
import FormField from '../components/FormField'
import styles from './AuthForm.module.css'

export default function RegisterPage() {
    const { register } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setError(null)
        setSubmitting(true)

        try {
            await register(username, email, password)
            navigate('/', { replace: true })
        } catch (err) {
            if (err.status === 409) {
                setError(err.message)
            } else if (err.status === 400) {
                setError('Please check the fields and try again.')
            } else {
                setError('Something went wrong, try later')
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section className={styles.container}>
            <h1>Register</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <FormField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                    maxLength={30}
                    pattern="[a-zA-Z0-9_]+"
                    title="Letters, numbers and underscores only"
                    autoComplete="username"
                />

                <FormField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                />

                <FormField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    maxLength={72}
                    autoComplete="new-password"
                />

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.button} disabled={submitting}>
                    {submitting ? 'Creating account...' : 'Create account'}
                </button>
            </form>

            <p>
                Already have an account? <Link to="/login">Log in</Link>
            </p>
        </section>
    )
}