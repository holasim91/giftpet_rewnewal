# DESIGN_SYSTEM.md — GIFT PET 디자인 시스템

Stitch(v0) 디자인 원본에서 추출한 토큰 명세.
`tailwind.config.ts`의 `theme.extend`는 이 문서를 기준으로 작성한다.

---

## 색상 토큰

### 핵심 색상 (자주 쓰는 것)

| 토큰 | 값 | 용도 |
|---|---|---|
| `primary` | `#ac341b` | 활성 링크, 포커스 링크 |
| `primary-container` | `#ff7051` | CTA 버튼 배경, 배지(NEW) 배경 |
| `primary-fixed` | `#ffdad3` | MD 추천 원형 배경 1 |
| `primary-fixed-dim` | `#ffb4a4` | MD 추천 원형 배경 2 |
| `on-primary` | `#ffffff` | primary-container 위 텍스트 |
| `on-primary-container` | `#6a1000` | primary-container 위 다크 텍스트 |

### 서피스 색상

| 토큰 | 값 | 용도 |
|---|---|---|
| `surface` | `#f7fafd` | 기본 페이지 배경 |
| `background` | `#f7fafd` | body 배경 |
| `surface-container-lowest` | `#ffffff` | 카드 배경 |
| `surface-container-low` | `#f1f4f7` | 상품 이미지 영역 배경 |
| `surface-container` | `#ebeef1` | 헤더 검색창 배경 |
| `surface-container-high` | `#e5e8eb` | 버튼 테두리, 구분선 |
| `surface-container-highest` | `#e0e3e6` | 푸터 배경(다크) |
| `surface-dim` | `#d7dadd` | 비활성 상태 배경 |

### 텍스트 색상

| 토큰 | 값 | 용도 |
|---|---|---|
| `on-surface` | `#181c1e` | 기본 텍스트 |
| `on-surface-variant` | `#59413c` | 보조 텍스트, 아이콘 |
| `on-background` | `#181c1e` | body 기본 텍스트 |
| `tertiary` | `#5f5e5e` | 플레이스홀더, 비활성 아이콘 |

### 기타

| 토큰 | 값 | 용도 |
|---|---|---|
| `outline` | `#8c716b` | 헤더 border |
| `outline-variant` | `#e0bfb8` | 카드 border, 구분선 |
| `secondary` | `#5c5f60` | 보조 색상 |
| `error` | `#ba1a1a` | 에러 상태 |
| `inverse-surface` | `#2d3133` | 다크 배경 |
| `inverse-on-surface` | `#eef1f4` | 다크 배경 위 텍스트 |

---

## 타이포그래피 토큰

폰트 패밀리: **Plus Jakarta Sans** (Google Fonts)
`next/font/google`로 로드한다.

| 토큰 | 크기 | Line Height | Weight | Letter Spacing | 용도 |
|---|---|---|---|---|---|
| `headline-xl` | 40px | 1.2 | 700 | -0.02em | 브랜드 로고 |
| `headline-lg` | 32px | 1.2 | 700 | — | 히어로 제목 |
| `headline-lg-mobile` | 28px | 1.2 | 700 | — | 모바일 히어로 제목 |
| `headline-md` | 24px | 1.3 | 600 | — | 섹션 제목 |
| `headline-sm` | 20px | 1.4 | 600 | — | 카드 제목, 드로어 헤더 |
| `body-lg` | 18px | 1.6 | 400 | — | 히어로 본문 |
| `body-md` | 16px | 1.6 | 400 | — | 기본 본문 |
| `label-md` | 14px | 1.0 | 600 | 0.05em | GNB 메뉴, 버튼 텍스트 |
| `label-sm` | 12px | 1.0 | 500 | — | 배지, 소형 레이블 |

---

## 간격 토큰

| 토큰 | 값 | 용도 |
|---|---|---|
| `margin-desktop` | 80px | 데스크톱 좌우 패딩 |
| `margin-mobile` | 20px | 모바일 좌우 패딩 |
| `gutter` | 24px | 그리드 컬럼 간격 |
| `base` | 8px | 기본 spacing 단위 |
| `container-max-width` | 1280px | 최대 컨테이너 너비 |

---

## 보더 레디우스

| 토큰 | 값 | 용도 |
|---|---|---|
| `DEFAULT` | 4px | 기본 (배지 등) |
| `lg` | 8px | 입력 필드, 소형 카드 |
| `xl` | 12px | 카드 |
| `full` | 9999px | 필 버튼, 검색창, 원형 아이콘 |
| (없음, `rounded-2xl`) | 16px | 히어로 배너, 섹션 컨테이너 |

---

## 그림자

HTML 원본에서 사용된 그림자 패턴:

```
shadow-[0px_4px_20px_rgba(0,0,0,0.05)]   // 카드 기본
shadow-[0px_8px_30px_rgba(0,0,0,0.1)]    // 카드 hover
shadow-[0px_10px_30px_rgba(0,0,0,0.1)]   // 메가메뉴 드롭다운
shadow-[0px_4px_20px_rgba(0,0,0,0.05)]   // 헤더
```

Tailwind arbitrary value로 그대로 사용한다.

---

## tailwind.config.ts 전체 토큰

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'surface': '#f7fafd',
        'on-tertiary-fixed': '#1b1c1c',
        'primary': '#ac341b',
        'outline': '#8c716b',
        'secondary-container': '#e1e3e4',
        'tertiary': '#5f5e5e',
        'surface-bright': '#f7fafd',
        'on-secondary-container': '#626566',
        'tertiary-container': '#9e9c9c',
        'on-tertiary-container': '#343434',
        'on-primary-container': '#6a1000',
        'inverse-surface': '#2d3133',
        'surface-dim': '#d7dadd',
        'surface-container': '#ebeef1',
        'primary-fixed-dim': '#ffb4a4',
        'inverse-on-surface': '#eef1f4',
        'error': '#ba1a1a',
        'on-background': '#181c1e',
        'surface-variant': '#e0e3e6',
        'on-tertiary': '#ffffff',
        'on-surface': '#181c1e',
        'on-tertiary-fixed-variant': '#474747',
        'on-primary-fixed': '#3d0500',
        'surface-container-lowest': '#ffffff',
        'surface-container-high': '#e5e8eb',
        'on-surface-variant': '#59413c',
        'background': '#f7fafd',
        'surface-container-highest': '#e0e3e6',
        'on-secondary-fixed-variant': '#454748',
        'error-container': '#ffdad6',
        'primary-container': '#ff7051',
        'on-secondary-fixed': '#191c1d',
        'secondary-fixed-dim': '#c5c7c8',
        'tertiary-fixed': '#e4e2e1',
        'on-secondary': '#ffffff',
        'on-primary-fixed-variant': '#8a1c04',
        'primary-fixed': '#ffdad3',
        'tertiary-fixed-dim': '#c8c6c6',
        'secondary': '#5c5f60',
        'on-primary': '#ffffff',
        'surface-container-low': '#f1f4f7',
        'secondary-fixed': '#e1e3e4',
        'inverse-primary': '#ffb4a4',
        'on-error-container': '#93000a',
        'surface-tint': '#ac341b',
        'on-error': '#ffffff',
        'outline-variant': '#e0bfb8',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      spacing: {
        'margin-desktop': '80px',
        'base': '8px',
        'margin-mobile': '20px',
        'gutter': '24px',
        'container-max-width': '1280px',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'sans-serif'],
      },
      fontSize: {
        'headline-xl': ['40px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-lg-mobile': ['28px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-sm': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '1.0', letterSpacing: '0.05em', fontWeight: '600' }],
        'label-sm': ['12px', { lineHeight: '1.0', fontWeight: '500' }],
      },
      maxWidth: {
        'container': '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 아이콘

Material Symbols Outlined 사용.
`layout.tsx`의 `<head>`에 Google Fonts CDN으로 로드:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  rel="stylesheet"
/>
```

사용법:
```tsx
<span className="material-symbols-outlined">shopping_cart</span>
```

아이콘 목록 (HTML 원본에서 사용된 것):
- `person`, `favorite`, `shopping_cart`, `search`
- `chevron_left`, `chevron_right`
- `menu`, `close`
- `arrow_forward`
- `public`, `photo_camera`
- `pet_supplies`, `skeleton`, `medical_services`, `brush`
- `cruelty_free`, `toys`, `eco`, `home`
- `set_meal`, `water_drop`, `healing`, `filter_alt`

---

## 컴포넌트별 디자인 노트

### Header (데스크톱)
- 3단 구조: 로고 중앙, 유틸 아이콘 우측, 검색창 중앙, GNB 중앙
- 메가메뉴: `group-hover` CSS로 구현. 4컬럼 (DOG / CAT / SMALL ANIMAL / AQUARIUM)
- 장바구니 아이콘: 우상단 카운트 배지 (absolute 포지셔닝)

### Header (모바일)
- 1단: 햄버거 좌측 / 로고 중앙 / 검색·찜·장바구니 우측
- 2단: 검색창 (전체 너비)
- 드로어: 좌측 슬라이드인, overlay 포함

### ProductCard
- 데스크톱: `min-w-[280px]` 고정 너비, hover 시 `-translate-y-1` + 그림자 강화
- 모바일: 2열 그리드, hover 없음 (터치 기반)
- "Add to Cart" 버튼: 데스크톱은 hover 시 opacity 표시, 모바일은 찜 버튼으로 대체

### HeroBanner
- 데스크톱: `h-[400px]`, 좌측 반투명 카드 오버레이
- 모바일: `aspect-[4/3]`, 하단 gradient overlay
