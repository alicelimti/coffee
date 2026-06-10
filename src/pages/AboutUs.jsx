import { useEffect, useRef } from 'react'

function FadeIn({ children, delay = 0, className = '' }) {
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
  return <div ref={ref} className={`fade-in ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

const sourcing = [
  { icon: '🌿', title: '산지 직접 소싱', desc: '전 세계 스페셜티 원두 농가와 직접 계약하여 최고 품질의 원두를 수급합니다.' },
  { icon: '⚖️', title: '공정무역', desc: '농가에 정당한 가격을 지불하고, 지속 가능한 커피 생산을 지원합니다.' },
  { icon: '🔬', title: '품질 관리', desc: '큐 그레이더가 직접 커핑하고 선별한 스페셜티 등급 원두만을 사용합니다.' },
]

export default function AboutUs() {
  return (
    <>
      <div className="page-header" style={{ paddingTop: 'calc(72px + 3.5rem)' }}>
        <h1>About Us</h1>
        <p>카페 철학 &amp; 스토리</p>
      </div>

      {/* Philosophy */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="about-philosophy">
            <FadeIn>
              <span className="section-label">OUR PHILOSOPHY</span>
              <h2 className="section-title">커피 한 잔이<br />일상이 되는 공간</h2>
              <p>
                모닝그린은 2026년, 아침의 첫 커피 한 잔이 하루를 어떻게 바꿀 수 있는지를 보여주고자
                문을 열었습니다. 우리의 이름처럼, 새벽의 신선한 초록빛을 담아 하루를 시작할 수 있는
                공간을 만들고자 했습니다.
              </p>
              <p>
                저희는 화려한 기교보다 원두 본연의 맛을 가장 잘 이끌어낼 수 있는 핸드드립에
                집중합니다. 싱글 오리진 원두 하나하나가 가진 고유한 테루아와 가공 방식을 존중하며,
                그 이야기를 한 잔의 커피에 담아 전달합니다.
              </p>
              <p>
                빠른 일상 속에서도 잠시 멈추고, 천천히 내려지는 커피 한 방울 한 방울에 집중하는
                시간. 그 여유로운 아침을 함께 시작하시기를 바랍니다.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="story-img-placeholder">
                <span>☕</span>
                <p>카페 내부 사진</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Barista */}
      <section className="section barista-section">
        <div className="container">
          <FadeIn>
            <span className="section-label">MEET THE BARISTA</span>
            <h2 className="section-title">바리스타 소개</h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="barista-grid">
              <div className="barista-photo">👤</div>
              <div className="barista-info">
                <h3>홍길동 바리스타</h3>
                <p className="barista-title">Head Barista &amp; Founder</p>
                <p>
                  서울을 기반으로 10년 이상 스페셜티 커피 씬에서 활동해온 바리스타입니다.
                  WBC(세계 바리스타 챔피언십) 국내 예선 참가 경험을 가지고 있으며,
                  에티오피아·케냐·콜롬비아 등 주요 커피 산지를 직접 방문하여
                  농가와 신뢰 관계를 쌓아왔습니다.
                </p>
                <p style={{ marginTop: '0.75rem' }}>
                  "커피는 사람과 사람 사이를 잇는 음료라고 생각합니다.
                  농부의 정성, 바리스타의 기술, 그리고 손님의 하루를 이어주는
                  다리 역할을 하고 싶습니다."
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sourcing */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <FadeIn>
            <span className="section-label">BEAN SOURCING</span>
            <h2 className="section-title">원두 소싱 방식</h2>
            <p className="section-subtitle">
              최고의 커피 한 잔은 최고의 원두에서 시작됩니다.
            </p>
          </FadeIn>
          <div className="sourcing-grid">
            {sourcing.map((item, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="sourcing-card">
                  <div className="sourcing-icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
