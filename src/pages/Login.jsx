import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { user, signInWithKakao, signInWithEmail, signUpWithEmail } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('login')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) navigate('/board')
  }, [user, navigate])

  const reset = () => { setError(''); setMessage('') }

  const handleLogin = async (e) => {
    e.preventDefault()
    reset()
    setLoading(true)
    const { error } = await signInWithEmail(email, password)
    if (error) setError(translateError(error.message))
    setLoading(false)
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    reset()
    if (password !== confirm) { setError('비밀번호가 일치하지 않습니다.'); return }
    if (password.length < 6) { setError('비밀번호는 6자 이상이어야 합니다.'); return }
    if (!nickname.trim()) { setError('닉네임을 입력해주세요.'); return }
    setLoading(true)
    const { error } = await signUpWithEmail(email, password, nickname.trim())
    if (error) {
      setError(translateError(error.message))
    } else {
      setMessage('가입 확인 이메일을 발송했습니다. 이메일을 확인해주세요.')
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <p className="section-label">회원 인증</p>

        <div className="login-tabs">
          <button
            className={`login-tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); reset() }}
          >로그인</button>
          <button
            className={`login-tab ${tab === 'signup' ? 'active' : ''}`}
            onClick={() => { setTab('signup'); reset() }}
          >회원가입</button>
        </div>

        {tab === 'login' ? (
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="nickname">닉네임</label>
              <input
                id="nickname"
                type="text"
                placeholder="사용할 닉네임을 입력하세요"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                maxLength={20}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="su-email">이메일</label>
              <input
                id="su-email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="su-password">비밀번호</label>
              <input
                id="su-password"
                type="password"
                placeholder="6자 이상 입력하세요"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm">비밀번호 확인</label>
              <input
                id="confirm"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            {error && <p className="auth-error">{error}</p>}
            {message && <p className="auth-message">{message}</p>}
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? '처리 중...' : '회원가입'}
            </button>
          </form>
        )}

        <div className="login-divider"><span>또는</span></div>

        <button className="btn-kakao" onClick={signInWithKakao}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.713 1.603 5.1 4.035 6.563-.163.588-.596 2.138-.682 2.469-.108.413.152.407.318.296.131-.087 2.078-1.41 2.92-1.984.457.065.926.098 1.409.098 5.523 0 10-3.477 10-7.8S17.523 3 12 3z"/>
          </svg>
          카카오로 로그인
        </button>
      </div>
    </div>
  )
}

function translateError(msg) {
  if (msg.includes('Invalid login credentials')) return '이메일 또는 비밀번호가 올바르지 않습니다.'
  if (msg.includes('Email not confirmed')) return '이메일 인증이 필요합니다. 메일함을 확인해주세요.'
  if (msg.includes('User already registered')) return '이미 가입된 이메일입니다.'
  if (msg.includes('Password should be')) return '비밀번호는 6자 이상이어야 합니다.'
  return '오류가 발생했습니다. 다시 시도해주세요.'
}
