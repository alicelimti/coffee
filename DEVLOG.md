# 개발일지 — CAFÉ 모닝그린

> 싱글 오리진 핸드드립 카페 웹사이트 개발 기록

---

## 2026-06-10 | 프로젝트 초기 세팅 & 기본 틀 구현

### 작업 개요
`cafe_website_plan.pdf` 기획안을 분석하여 React + Vite 기반의 카페 홍보 웹사이트 기본 틀을 구축했습니다.

---

### 기술 스택
| 항목 | 선택 |
|---|---|
| 프레임워크 | React 18 + Vite 5 |
| 라우팅 | React Router DOM v6 |
| 스타일링 | Vanilla CSS (CSS Variables) |
| 배포 | GitHub Pages (`gh-pages`) |

---

### 디자인 시스템 적용

기획안의 컬러 가이드를 CSS 변수로 구현했습니다.

| 변수 | 색상 | 용도 |
|---|---|---|
| `--primary` | `#2C5F2D` | 주요 버튼, 헤더, 카드 상단 |
| `--secondary` | `#4A7C59` | 호버 상태, 보조 강조 |
| `--light-green` | `#8FAF8A` | 지도 플레이스홀더, 서브 요소 |
| `--bg` | `#F5EDDC` | 전체 배경 |
| `--brown` | `#6B3F1E` | 테이스팅 노트, 포인트 텍스트 |

폰트: Playfair Display (영문 제목) · Noto Serif KR (한글 제목) · Noto Sans KR (본문)

---

### 구현된 페이지 & 컴포넌트

#### 공통 컴포넌트
- **`Navbar`** — 고정(sticky) 네비게이션. 로고 + 위치/메뉴/About Us/Contact 링크. 모바일 햄버거 메뉴 포함.
- **`Footer`** — 카페 소개 + 메뉴 링크 + SNS 링크 (Instagram · Naver Blog · KakaoTalk)
- **`useFadeIn` hook** — IntersectionObserver 기반 스크롤 fade-in 애니메이션

#### 페이지
| 페이지 | 경로 | 주요 섹션 |
|---|---|---|
| 홈 | `/` | Hero · 싱글 오리진 카드 · 스토리 · 위치 미리보기 |
| 메뉴 | `/menu` | 핸드드립 3종 카드 · 테이스팅 노트 · 시즌/디카페인 |
| 위치 | `/location` | 지도 영역 · 영업시간 · 대중교통 안내 |
| About Us | `/about` | 카페 철학 · 바리스타 소개 · 원두 소싱 방식 |
| Contact | `/contact` | 문의 폼 · 연락처 · SNS · 클래스 안내 |

---

### 메뉴 데이터

기획안에서 명시된 3종의 싱글 오리진을 구현했습니다.

| 원두 | 테이스팅 노트 | 로스팅 | 가격 |
|---|---|---|---|
| 에티오피아 예가체프 | 베리 · 재스민 · 시트러스 | 라이트 | ₩7,500 |
| 콜롬비아 우일라 | 카라멜 · 사과 · 헤이즐넛 | 미디엄 | ₩7,000 |
| 케냐 AA | 블랙커런트 · 토마토 · 와인 | 미디엄-다크 | ₩8,000 |

---

### 향후 작업 예정
- [ ] 실제 카페 이미지 교체 (Hero 배경, 바리스타 사진, 내부 사진)
- [ ] Google Maps 임베드 연동
- [ ] Contact 폼 백엔드 연결 (이메일 발송)
- [ ] 시즌 메뉴 CMS 연동 검토
- [ ] 모바일 햄버거 메뉴 드롭다운 구현
- [ ] SEO 메타 태그 추가

---

## 2026-06-10 | GitHub Pages SPA 라우팅 404 에러 수정

### 문제
배포 후 루트(`/`) 접근은 정상이나, `/menu` · `/about` 등 하위 경로를 직접 URL로 입력하거나 새로고침하면 404 에러 발생.

### 원인 분석
GitHub Pages는 정적 파일 서버로, `/menu` 같은 경로에 해당하는 실제 파일이 없으면 `404.html`을 반환합니다. React Router는 클라이언트 사이드 라우팅이므로 `index.html`이 먼저 로드돼야 동작합니다.

초기 구현에서 `404.html`과 `index.html`의 리다이렉트 방식이 달라 URL 복원에 실패했습니다.

| 파일 | 수정 전 | 수정 후 |
|---|---|---|
| `404.html` | query string 방식(`?/menu`)으로 리다이렉트 | `sessionStorage`에 URL 저장 후 루트로 이동 |
| `index.html` | `sessionStorage` 방식으로 읽음 | 동일 (변경 없음) |

### 수정 후 동작 흐름
1. `/coffee/menu` 직접 접근 → GitHub Pages가 `404.html` 반환
2. `404.html` JS 실행 → `sessionStorage.redirect`에 원래 URL 저장 → `/coffee/`로 리다이렉트
3. `index.html` JS 실행 → `sessionStorage`에서 URL 읽어 `history.replaceState`로 복원
4. React Router가 정상 경로를 인식하여 해당 페이지 렌더링

### 수정 파일
- `public/404.html` — sessionStorage 방식으로 교체
