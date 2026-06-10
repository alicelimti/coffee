import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function Board() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('posts')
      .select('id, title, author_name, created_at, content')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setPosts(data ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>커뮤니티</h1>
          <p>카페를 사랑하는 분들의 이야기</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="board-toolbar">
            <p className="board-count">전체 {posts.length}개</p>
            {user && (
              <button className="btn btn-primary" onClick={() => navigate('/board/write')}>
                글쓰기
              </button>
            )}
          </div>

          {loading ? (
            <div className="board-loading">
              <div className="auth-spinner" />
            </div>
          ) : posts.length === 0 ? (
            <div className="board-empty">
              <p>아직 작성된 글이 없습니다.</p>
              {user && (
                <button className="btn btn-outline" onClick={() => navigate('/board/write')}>
                  첫 글 작성하기
                </button>
              )}
            </div>
          ) : (
            <ul className="board-list">
              {posts.map((post, i) => (
                <li key={post.id} className="board-item">
                  <span className="board-num">{posts.length - i}</span>
                  <Link to={`/board/${post.id}`} className="board-title">
                    {post.title}
                  </Link>
                  <span className="board-meta">
                    <span className="board-author">{post.author_name}</span>
                    <span className="board-date">{formatDate(post.created_at)}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {!user && (
            <p className="board-login-hint">
              <Link to="/login">로그인</Link>하면 글을 작성할 수 있습니다.
            </p>
          )}
        </div>
      </section>
    </>
  )
}

function formatDate(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}
