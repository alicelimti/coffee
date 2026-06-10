import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function BoardWrite() {
  const { id } = useParams()
  const isEdit = !!id
  const { user } = useAuth()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  useEffect(() => {
    if (!isEdit) return
    supabase.from('posts').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error || data?.author_id !== user?.id) {
        navigate('/board')
        return
      }
      setTitle(data.title)
      setContent(data.content)
    })
  }, [id, isEdit, user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    setSubmitting(true)

    const authorName =
      user.user_metadata?.name ||
      user.user_metadata?.full_name ||
      user.user_metadata?.user_name ||
      user.email?.split('@')[0] ||
      '익명'

    let error
    if (isEdit) {
      ;({ error } = await supabase
        .from('posts')
        .update({ title: title.trim(), content: content.trim(), updated_at: new Date().toISOString() })
        .eq('id', id))
    } else {
      ;({ error } = await supabase.from('posts').insert({
        title: title.trim(),
        content: content.trim(),
        author_id: user.id,
        author_name: authorName,
      }))
    }

    if (error) {
      alert('저장 중 오류가 발생했습니다.')
      setSubmitting(false)
    } else {
      navigate('/board')
    }
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>{isEdit ? '글 수정' : '글쓰기'}</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <form className="write-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">제목</label>
              <input
                id="title"
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={100}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">내용</label>
              <textarea
                id="content"
                placeholder="내용을 입력하세요"
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={14}
                required
              />
            </div>
            <div className="write-actions">
              <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
                취소
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? '저장 중...' : isEdit ? '수정 완료' : '등록'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
