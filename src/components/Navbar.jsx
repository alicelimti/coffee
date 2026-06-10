import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to="/" className="nav-logo">CAFÉ 모닝그린</NavLink>

        <ul className={`nav-links ${open ? 'nav-open' : ''}`}>
          <li><NavLink to="/location" onClick={() => setOpen(false)}>위치</NavLink></li>
          <li><NavLink to="/menu" onClick={() => setOpen(false)}>메뉴</NavLink></li>
          <li><NavLink to="/about" onClick={() => setOpen(false)}>About Us</NavLink></li>
          <li><NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink></li>
        </ul>

        <button
          className="nav-hamburger"
          onClick={() => setOpen(!open)}
          aria-label="메뉴 열기"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
