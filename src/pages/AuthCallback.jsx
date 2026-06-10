import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')

    if (code) {
      supabase.auth.exchangeCodeForSession(code)
        .then(() => navigate('/board'))
        .catch(() => navigate('/login'))
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        navigate(session ? '/board' : '/login')
      })
    }
  }, [navigate])

  return (
    <div className="auth-callback">
      <div className="auth-callback-inner">
        <div className="auth-spinner" />
        <p>로그인 중입니다...</p>
      </div>
    </div>
  )
}
