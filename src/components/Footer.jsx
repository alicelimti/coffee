import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">CAFÉ 모닝그린</div>
            <p>
              아침을 함께 시작합니다.<br />
              싱글 오리진 핸드드립 카페
            </p>
            <div className="footer-sns">
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Naver Blog">NB</a>
              <a href="#" aria-label="KakaoTalk">KT</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>메뉴</h4>
            <ul>
              <li><Link to="/menu">싱글 오리진 핸드드립</Link></li>
              <li><Link to="/menu">시즌 한정 메뉴</Link></li>
              <li><Link to="/menu">디카페인</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>정보</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/location">오시는 길</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/contact">클래스 문의</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 CAFÉ 모닝그린. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
