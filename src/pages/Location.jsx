import { useEffect, useRef } from 'react'

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

export default function Location() {
  return (
    <>
      <div className="page-header" style={{ paddingTop: 'calc(72px + 3.5rem)' }}>
        <h1>위치</h1>
        <p>카페 위치 &amp; 오시는 길</p>
      </div>

      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <FadeIn>
            <div className="location-map-full">
              <span>📍</span>
              <p>지도 영역 (Google Maps 임베드)</p>
            </div>
          </FadeIn>

          <div className="location-details">
            <FadeIn>
              <div className="detail-block">
                <h3>영업시간</h3>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>월요일 – 금요일</span><span>08:00 – 19:00</span>
                  </div>
                  <div className="hours-item">
                    <span>토요일 – 일요일</span><span>09:00 – 20:00</span>
                  </div>
                  <div className="hours-item">
                    <span>공휴일</span><span>10:00 – 18:00</span>
                  </div>
                </div>
                <p style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.65, fontStyle: 'italic' }}>
                  * 브레이크타임 없이 운영합니다.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="detail-block">
                <h3>오시는 길</h3>
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontWeight: 600, marginBottom: '0.4rem', color: 'var(--primary)' }}>주소</p>
                  <p>서울특별시 OO구 OO동 000-0<br />모닝그린 빌딩 1층</p>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontWeight: 600, marginBottom: '0.4rem', color: 'var(--primary)' }}>대중교통</p>
                  <ul className="detail-block">
                    <li>지하철 OO선 OO역 X번 출구 도보 5분</li>
                    <li>버스 000번 OO정류장 하차</li>
                    <li>버스 000번, 000번 이용 가능</li>
                  </ul>
                </div>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: '0.4rem', color: 'var(--primary)' }}>주차 안내</p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.75 }}>
                    건물 내 주차 2시간 무료 (음료 주문 시)<br />
                    건물 후면 주차장 이용 가능
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
