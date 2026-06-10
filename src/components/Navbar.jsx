import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const close = () => setOpen(false)

  const handleSignOut = async () => {
    await signOut()
    close()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to="/" className="nav-logo">CAFÉ 모닝그린</NavLink>

        <ul className={`nav-links ${open ? 'nav-open' : ''}`}>
          <li><NavLink to="/location" onClick={close}>위치</NavLink></li>
          <li><NavLink to="/menu" onClick={close}>메뉴</NavLink></li>
          <li><NavLink to="/about" onClick={close}>About Us</NavLink></li>
          <li><NavLink to="/contact" onClick={close}>Contact</NavLink></li>
          <li><NavLink to="/board" onClick={close}>커뮤니티</NavLink></li>
        </ul>

        <div className="nav-right">
          {user ? (
            <div className="nav-user">
              <span className="nav-username">
                {user.user_metadata?.name || user.user_metadata?.full_name || user.email?.split('@')[0]}
              </span>
              <button className="btn-nav-auth" onClick={handleSignOut}>로그아웃</button>
            </div>
          ) : (
            <NavLink to="/login" className="btn-nav-auth" onClick={close}>로그인</NavLink>
          )}
        </div>

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
