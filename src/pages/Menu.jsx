import { useEffect, useRef } from 'react'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`fade-in ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const coffees = [
  {
    id: 1,
    name: '에티오피아 예가체프',
    origin: 'Ethiopia Yirgacheffe',
    notes: ['베리', '재스민', '시트러스'],
    roast: '라이트',
    price: '₩7,500',
    desc: '에티오피아 남부 예가체프 지역의 워시드 프로세스 원두로, 밝고 화사한 과일향과 꽃향이 특징입니다.',
  },
  {
    id: 2,
    name: '콜롬비아 우일라',
    origin: 'Colombia Huila',
    notes: ['카라멜', '사과', '헤이즐넛'],
    roast: '미디엄',
    price: '₩7,000',
    desc: '콜롬비아 우일라 지역 고산지대에서 재배된 원두로, 부드러운 단맛과 고소한 견과류 향이 조화를 이룹니다.',
  },
  {
    id: 3,
    name: '케냐 AA',
    origin: 'Kenya AA',
    notes: ['블랙커런트', '토마토', '와인'],
    roast: '미디엄-다크',
    price: '₩8,000',
    desc: '케냐 최고 등급의 AA 원두로, 풍부한 바디감과 복잡한 풍미가 특징인 핸드드립 커피입니다.',
  },
]

const seasonal = [
  { name: '시즌 한정 싱글 오리진', desc: '매 시즌 새로운 산지의 원두를 소개합니다. 현재 시즌 메뉴는 매장에서 확인하세요.', badge: 'SEASONAL' },
  { name: '디카페인 핸드드립', desc: '카페인 걱정 없이 즐기는 싱글 오리진 핸드드립. 스위스 워터 프로세스로 처리된 원두를 사용합니다.', badge: 'DECAF' },
]

export default function Menu() {
  return (
    <>
      <div className="page-header" style={{ paddingTop: 'calc(72px + 3.5rem)' }}>
        <h1>메뉴</h1>
        <p>Single Origin Handdrip Coffee</p>
      </div>

      <section className="menu-intro">
        <div className="container">
          <FadeIn>
            <p className="menu-intro-text">
              원산지별 개성 있는 싱글 오리진 원두를 직접 핸드드립으로 추출합니다.<br />
              각 원두의 테이스팅 노트와 원산지 정보를 상세히 소개합니다.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <FadeIn>
            <span className="section-label">HANDDRIP</span>
            <h2 className="section-title">싱글 오리진 핸드드립</h2>
          </FadeIn>
          <div className="menu-grid">
            {coffees.map((coffee, i) => (
              <FadeIn key={coffee.id} delay={i * 150}>
                <div className="menu-card">
                  <div className="menu-card-top">
                    <span className="coffee-icon">🍃</span>
                  </div>
                  <div className="menu-card-body">
                    <h3>{coffee.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--brown)', fontStyle: 'italic', marginBottom: '1rem', opacity: 0.8 }}>
                      {coffee.origin}
                    </p>
                    <span className="tasting-label">TASTING NOTES</span>
                    <p className="tasting-notes">{coffee.notes.join(' · ')}</p>
                    <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--text)', opacity: 0.75, marginBottom: '1.25rem' }}>
                      {coffee.desc}
                    </p>
                    <div className="coffee-meta">
                      <span>로스팅: {coffee.roast}</span>
                      <span className="coffee-price">{coffee.price}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p className="seasonal-note">
              + 시즌 한정 싱글 오리진 &amp; 디카페인 옵션 별도 운영
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <FadeIn>
            <span className="section-label">SPECIAL</span>
            <h2 className="section-title">스페셜 메뉴</h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {seasonal.map((item, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--radius)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'flex-start',
                }}>
                  <span style={{
                    background: 'var(--primary)',
                    color: 'var(--white)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    marginTop: '3px',
                  }}>
                    {item.badge}
                  </span>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-korean)', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                      {item.name}
                    </h4>
                    <p style={{ fontSize: '0.88rem', lineHeight: 1.75, opacity: 0.75 }}>{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
