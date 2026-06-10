import { useState, useEffect, useRef } from 'react'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className="fade-in" style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: 'general', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <div className="page-header" style={{ paddingTop: 'calc(72px + 3.5rem)' }}>
        <h1>Contact</h1>
        <p>문의 &amp; 예약 / 클래스 안내</p>
      </div>

      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="contact-layout">
            <FadeIn>
              <span className="section-label">SEND A MESSAGE</span>
              <h2 className="section-title">문의하기</h2>

              {sent ? (
                <div style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius)',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☕</div>
                  <h3 style={{ fontFamily: 'var(--font-korean)', color: 'var(--primary)', marginBottom: '0.75rem' }}>
                    문의가 접수되었습니다
                  </h3>
                  <p style={{ opacity: 0.7, fontSize: '0.92rem' }}>
                    빠른 시일 내에 답변 드리겠습니다. 감사합니다.
                  </p>
                  <button
                    className="btn btn-outline"
                    onClick={() => { setSent(false); setForm({ name: '', email: '', type: 'general', message: '' }) }}
                    style={{ marginTop: '1.5rem' }}
                  >
                    새 문의 작성
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>이름</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="홍길동"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>이메일</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>문의 유형</label>
                    <select name="type" value={form.type} onChange={handleChange}>
                      <option value="general">일반 문의</option>
                      <option value="reservation">예약 문의</option>
                      <option value="class">클래스 문의</option>
                      <option value="other">기타</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>메시지</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="문의 내용을 입력해 주세요."
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                    보내기
                  </button>
                </form>
              )}
            </FadeIn>

            <FadeIn delay={200}>
              <div>
                <span className="section-label">CONTACT INFO</span>
                <h3 style={{ fontFamily: 'var(--font-korean)', fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '2rem' }}>
                  연락처 &amp; 정보
                </h3>

                <div className="contact-info">
                  <div className="contact-info-item">
                    <span className="contact-info-icon">📍</span>
                    <span>서울특별시 OO구 OO동 000-0<br />모닝그린 빌딩 1층</span>
                  </div>
                  <div className="contact-info-item">
                    <span className="contact-info-icon">🕐</span>
                    <span>
                      월–금 08:00 – 19:00<br />
                      토–일 09:00 – 20:00
                    </span>
                  </div>
                  <div className="contact-info-item">
                    <span className="contact-info-icon">📧</span>
                    <span>hello@cafe-morninggreen.kr</span>
                  </div>
                  <div className="contact-info-item">
                    <span className="contact-info-icon">📞</span>
                    <span>02-000-0000</span>
                  </div>
                </div>

                <div style={{ marginTop: '2.5rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--brown)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    SNS
                  </p>
                  <div className="sns-links">
                    <a href="#" className="sns-link">📸 Instagram</a>
                    <a href="#" className="sns-link">📝 Naver Blog</a>
                    <a href="#" className="sns-link">💬 KakaoTalk</a>
                  </div>
                </div>

                <div style={{
                  marginTop: '2.5rem',
                  background: 'var(--white)',
                  borderRadius: 'var(--radius)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <p style={{ fontFamily: 'var(--font-korean)', fontWeight: 600, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                    ☕ 핸드드립 클래스
                  </p>
                  <p style={{ fontSize: '0.88rem', opacity: 0.75, lineHeight: 1.7 }}>
                    매월 정기 핸드드립 클래스를 운영합니다.<br />
                    자세한 일정 및 신청은 문의 폼을 이용해 주세요.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
