import { Link } from 'react-router-dom'
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
      { threshold: 0.12 }
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
    notes: ['베리', '재스민', '시트러스'],
    roast: '라이트',
    price: '₩7,500',
  },
  {
    id: 2,
    name: '콜롬비아 우일라',
    notes: ['카라멜', '사과', '헤이즐넛'],
    roast: '미디엄',
    price: '₩7,000',
  },
  {
    id: 3,
    name: '케냐 AA',
    notes: ['블랙커런트', '토마토', '와인'],
    roast: '미디엄-다크',
    price: '₩8,000',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content fade-in visible">
          <span className="hero-label">SINGLE ORIGIN HANDDRIP CAFÉ</span>
          <h1>아침을 함께<br />시작합니다</h1>
          <p className="hero-sub">Single Origin Handdrip Coffee</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-light">메뉴 보기</Link>
            <Link to="/location" className="btn btn-dark">오시는 길</Link>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="section features-section">
        <div className="container">
          <FadeIn>
            <span className="section-label">SINGLE ORIGIN</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>오늘의 싱글 오리진</h2>
            <p className="section-subtitle">
              원산지별 개성 있는 싱글 오리진 원두를 직접 핸드드립으로 추출합니다.<br />
              각 원두의 테이스팅 노트와 원산지 정보를 상세히 소개합니다.
            </p>
          </FadeIn>
          <div className="coffee-grid">
            {coffees.map((coffee, i) => (
              <FadeIn key={coffee.id} delay={i * 150}>
                <div className="coffee-card">
                  <div className="coffee-card-top">
                    <span className="coffee-icon">🍃</span>
                  </div>
                  <div className="coffee-card-body">
                    <h3>{coffee.name}</h3>
                    <span className="tasting-label">TASTING NOTES</span>
                    <p className="tasting-notes">{coffee.notes.join(' · ')}</p>
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
            <div className="features-cta">
              <Link to="/menu" className="btn btn-outline">전체 메뉴 보기</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Story Section */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <FadeIn className="story-text">
              <span className="section-label">OUR STORY</span>
              <h2 className="section-title">커피 한 잔에<br />담긴 이야기</h2>
              <p>
                모닝그린은 매일 아침, 정성껏 내린 핸드드립 커피 한 잔으로 하루를 시작하는 공간입니다.
                전 세계 최고의 산지에서 엄선한 싱글 오리진 원두만을 사용합니다.
              </p>
              <p>
                각 원두가 가진 고유한 향미를 온전히 전달하기 위해, 바리스타가 직접 최적의
                추출 방식을 연구하고 고집합니다.
              </p>
              <Link to="/about" className="btn btn-outline" style={{ marginTop: '2rem' }}>
                About Us
              </Link>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="story-img-placeholder">
                <span>☕</span>
                <p>바리스타 사진</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Location Preview */}
      <section className="section location-preview">
        <div className="container">
          <div className="location-grid">
            <FadeIn>
              <div className="map-placeholder">
                <span>📍</span>
                <p>지도</p>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <span className="section-label">FIND US</span>
              <h2 className="section-title">오시는 길</h2>
              <div className="hours-list">
                <div className="hours-item">
                  <span>월 – 금</span>
                  <span>08:00 – 19:00</span>
                </div>
                <div className="hours-item">
                  <span>토 – 일</span>
                  <span>09:00 – 20:00</span>
                </div>
                <div className="hours-item">
                  <span>공휴일</span>
                  <span>10:00 – 18:00</span>
                </div>
              </div>
              <Link to="/location" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                상세 위치 보기
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
