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

---

## 2026-06-10 | GitHub 리포지토리 About 섹션 배포 URL 미노출 수정

### 문제
`https://alicelimti.github.io/coffee/`로 직접 접근하면 사이트가 정상 동작하나, GitHub 리포지토리 페이지(`github.com/alicelimti/coffee`) 우측 About 섹션에 배포 URL이 표시되지 않음.

### 원인
리포지토리의 `homepage` 필드가 설정되지 않아 About 섹션에 링크가 노출되지 않았습니다.

### 수정 내용
GitHub API를 통해 리포지토리 메타데이터를 업데이트했습니다.

| 항목 | 수정 전 | 수정 후 |
|---|---|---|
| `homepage` | (없음) | `https://alicelimti.github.io/coffee/` |
| `description` | `카페` | `CAFÉ 모닝그린 \| 싱글 오리진 핸드드립 카페` |

이제 리포지토리 페이지 About 섹션에서 배포 URL을 바로 확인하고 클릭할 수 있습니다.

---

## 2026-06-10 | Supabase 연동 — 로그인 및 게시판 기능 구현

### 작업 개요
Supabase를 백엔드로 연결하여 카카오 OAuth·이메일 로그인과 커뮤니티 게시판 기능을 추가했습니다.

---

### 추가된 기술 스택

| 항목 | 선택 |
|---|---|
| 백엔드/DB | Supabase (PostgreSQL + Auth) |
| 인증 | Kakao OAuth · 이메일/비밀번호 |
| 클라이언트 라이브러리 | `@supabase/supabase-js` |

---

### 신규 파일 구조

```
src/
├── lib/
│   └── supabase.js          — Supabase 클라이언트 초기화
├── contexts/
│   └── AuthContext.jsx      — 전역 인증 상태 관리 (Context + Provider)
└── pages/
    ├── Login.jsx            — 로그인/회원가입 탭 UI
    ├── AuthCallback.jsx     — OAuth 리다이렉트 콜백 처리
    ├── Board.jsx            — 게시글 목록
    ├── BoardPost.jsx        — 게시글 상세 (수정·삭제 포함)
    └── BoardWrite.jsx       — 글쓰기·수정 폼 (공용)
```

---

### 인증 기능

#### 카카오 OAuth
- Supabase Auth → Kakao Provider 활성화
- 카카오 개발자 콘솔에서 앱 등록, Web 플랫폼 도메인 및 Redirect URI 설정
- Redirect URI: `https://brwtobsmjyfsbhowhsmg.supabase.co/auth/v1/callback`
- 콜백 경로 `/auth/callback`에서 PKCE 코드 교환 후 `/board`로 이동

#### 이메일/비밀번호
- 로그인과 회원가입을 탭으로 분리한 단일 페이지 UI
- 회원가입 시 닉네임 입력 → `user_metadata.name`에 저장 → 게시판 작성자명으로 활용
- Supabase `mailer_autoconfirm: false` 상태이므로 가입 후 이메일 인증 필요
- 에러 메시지 한국어 처리 (`Invalid login credentials`, `User already registered` 등)

---

### 게시판 기능

#### Supabase `posts` 테이블 스키마

| 컬럼 | 타입 | 설명 |
|---|---|---|
| `id` | UUID (PK) | 자동 생성 |
| `title` | TEXT | 제목 |
| `content` | TEXT | 본문 |
| `author_id` | UUID (FK → auth.users) | 작성자 |
| `author_name` | TEXT | 표시 이름 |
| `created_at` | TIMESTAMPTZ | 작성일 |
| `updated_at` | TIMESTAMPTZ | 수정일 |

#### Row Level Security (RLS) 정책

| 정책 | 대상 |
|---|---|
| SELECT | 모든 사용자 (비로그인 포함) |
| INSERT | 로그인 사용자 본인만 |
| UPDATE | 작성자 본인만 |
| DELETE | 작성자 본인만 |

#### 게시판 라우트

| 경로 | 기능 |
|---|---|
| `/board` | 글 목록 (최신순) |
| `/board/write` | 새 글 작성 (로그인 필요) |
| `/board/:id` | 글 상세 + 본인 글 수정·삭제 |
| `/board/:id/edit` | 글 수정 폼 |

---

### 트러블슈팅

| 오류 | 원인 | 해결 |
|---|---|---|
| `Unsupported provider: provider is not enabled` | Supabase Kakao Provider 미활성화 | 대시보드에서 Kakao 토글 ON + REST API Key / Client Secret 입력 |
| 카카오 KOE004 (앱 관리자 설정 오류) | 카카오 개발자 콘솔 Web 플랫폼 도메인 미등록 | `https://alicelimti.github.io` 및 `https://brwtobsmjyfsbhowhsmg.supabase.co` 플랫폼 등록 |

---

### 향후 작업 예정 (업데이트)
- [x] Supabase DB 연결
- [x] 카카오 OAuth 로그인
- [x] 이메일/비밀번호 로그인·회원가입
- [x] 커뮤니티 게시판 CRUD
- [ ] 댓글 기능
- [ ] 게시글 페이지네이션
- [ ] 이미지 첨부 (Supabase Storage)
- [ ] 실제 카페 이미지 교체
- [ ] Google Maps 임베드 연동
- [ ] Contact 폼 이메일 발송 연결
- [ ] SEO 메타 태그 추가
