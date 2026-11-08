import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import styles from './Layout.module.css'

function navLinkClass({ isActive }) {
    return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
}

export default function Layout() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerInner}>
                    <Link to="/" className={styles.logo}>
                        <span className={styles.logoMark} aria-hidden="true" />
                        Cinelog
                    </Link>

                    <nav className={styles.nav} aria-label="Main navigation">
                        <NavLink to="/" end className={navLinkClass}>Home</NavLink>
                        <NavLink to="/search" className={navLinkClass}>Search</NavLink>
                    </nav>

                    <div className={styles.actions}>
                        {user ? (
                            <>
                                <Link to="/profile" className={styles.profile}>
                                    <span className={styles.avatar} aria-hidden="true">
                                        {user.username.charAt(0).toUpperCase()}
                                    </span>
                                    <span className={styles.username}>{user.username}</span>
                                </Link>
                                <button type="button" className="btn btn-secondary btn-sm" onClick={handleLogout}>
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={styles.loginLink}>Log in</Link>
                                <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className={styles.main}>
                <Outlet />
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    <span className={styles.footerBrand}>Cinelog</span>
                    <div className={styles.attribution}>
                        <img src="/tmdb-logo.svg" alt="TMDB logo" className={styles.tmdbLogo} />
                        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}