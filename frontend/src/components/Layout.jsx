import { Link, Outlet, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import styles from './Layout.module.css'

export default function Layout() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <>
            <header className={styles.header}>
                <Link to="/"><strong>Cinelog</strong></Link>
                <nav className={styles.nav}>
                    {user ? (
                        <>
                            <Link to="/search">Search</Link>
                            <Link to="/profile">{user.username}</Link>
                            <button onClick={handleLogout}>Log out</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Log in</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </nav>

            </header >

            <main className={styles.main}>
                <Outlet />
            </main>

            <footer className={styles.footer}>
                <img src="/tmdb-logo.svg" alt="TMDB logo" className={styles.tmdbLogo} />
                <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
            </footer>
        </>
    )
}