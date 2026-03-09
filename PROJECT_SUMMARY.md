# 🚀 Platform — Master Template 프로젝트 요약

## 기술 스택
- **React + TypeScript + Vite**
- **Tailwind CSS** (커스텀 디자인 토큰, 글래스모피즘)
- **Framer Motion** (입장/스크롤 애니메이션)
- **Lucide React** (아이콘)
- **Zod** (폼 유효성 검사)

---

## 구현된 페이지 (8개)

| 경로 | 페이지 | 주요 기능 |
|------|--------|-----------|
| `/` | **홈 (Index)** | Hero(3가지 변형), Feature Grid, Portfolio, About, Testimonials, FAQ, Newsletter, Footer |
| `/login` | **로그인** | 소셜 로그인(Google/GitHub), 비밀번호 토글, 스플릿 레이아웃 |
| `/signup` | **회원가입** | 비밀번호 강도 표시기, 실시간 유효성 검사 |
| `/about` | **About** | 미션, 팀 카드(호버 효과), 가치관 아이콘 그리드 |
| `/detail` | **상세 보기** | 미디어 갤러리, 제품 정보, 아코디언, 내러티브, 관련 항목 |
| `/collection` | **컬렉션 & 검색** | 필터 사이드바, 검색, 그리드/리스트 뷰, 위시리스트, Load More |
| `/pricing` | **요금제** | Monthly/Yearly 토글, 3단계 카드, 기능 체크리스트, FAQ |
| `/contact` | **연락처** | Zod 폼 검증, 성공 상태 애니메이션, 맵 플레이스홀더, 소셜 링크 |

---

## 공통 컴포넌트

| 컴포넌트 | 설명 |
|----------|------|
| `Navbar` | 글래스모피즘 내비바, 메가메뉴, 모바일 사이드바 |
| `HeroSection` | `centered` / `split` / `video` 변형 지원 |
| `FeatureGrid` | 호버 반응형 카드 + Lucide 아이콘 |
| `PortfolioShowcase` | 카테고리 필터링 + AnimatePresence |
| `AboutSection` | 비대칭 레이아웃 + 통계 애니메이션 |
| `Testimonials` | 자동 회전 캐러셀 |
| `FaqAccordion` | Radix 아코디언 |
| `NewsletterCta` | 전환 최적화 CTA |
| `Footer` | 멀티 컬럼 푸터 |

### Detail 전용 컴포넌트
`MediaGallery` · `ProductInfo` · `ExpandableDetails` · `NarrativeSection` · `KeyHighlights` · `RelatedItems` · `MobileQuickAction`

---

## 디자인 시스템
- **색상**: Sapphire 액센트 + 모노톤 뉴트럴 (HSL 토큰)
- **타이포그래피**: Inter
- **효과**: 글래스모피즘(`.glass`), 소프트 섀도우(`--shadow-elevated`), 그래디언트
- **애니메이션**: staggered fade-in, 스프링 전환, 스크롤 트리거
- **반응형**: 모바일 퍼스트 설계
