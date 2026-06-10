import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function BoardPost() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error) navigate('/board')
        else setPost(data)
        setLoading(false)
      })
  }, [id, navigate])

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    setDeleting(true)
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (!error) navigate('/board')
    else {
      alert('삭제 중 오류가 발생했습니다.')
      setDeleting(false)
    }
  }

  if (loading) return (
    <div className="auth-callback">
      <div className="auth-callback-inner"><div className="auth-spinner" /></div>
    </div>
  )

  if (!post) return null

  const isAuthor = user?.id === post.author_id

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>커뮤니티</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="post-card">
            <div className="post-header">
              <h2 className="post-title">{post.title}</h2>
              <div className="post-info">
                <span className="board-author">{post.author_name}</span>
                <span className="board-date">{formatDate(post.created_at)}</span>
              </div>
            </div>
            <div className="post-body">
              {post.content.split('\n').map((line, i) => (
                <p key={i}>{line || ' '}</p>
              ))}
            </div>
            <div className="post-actions">
              <Link to="/board" className="btn btn-outline">목록으로</Link>
              {isAuthor && (
                <div className="post-author-actions">
                  <Link to={`/board/${id}/edit`} className="btn btn-primary">수정</Link>
                  <button className="btn btn-delete" onClick={handleDelete} disabled={deleting}>
                    {deleting ? '삭제 중...' : '삭제'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function formatDate(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}
