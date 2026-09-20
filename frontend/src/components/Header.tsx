import { Link, NavLink } from 'react-router-dom'

export function Header() {
  return <header className="site-header">
    <Link className="brand" to="/"><span aria-hidden="true">▣</span> PYQ Hub</Link>
    <nav aria-label="Main navigation">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/papers">Browse papers</NavLink>
    </nav>
  </header>
}
