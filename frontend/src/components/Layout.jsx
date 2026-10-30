import { Link, Outlet } from "react-router";

export default function Layout(){
    return(
    <>
    <header style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #2c3440' }}>
        <Link to="/"><strong>Cinelog</strong></Link>
        <nav style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </nav>
    </header>

     <main style={{ padding: '1rem', maxWidth: '960px', margin: '0 auto' }}>
    <Outlet /> 
     </main>
    </>
    )
}