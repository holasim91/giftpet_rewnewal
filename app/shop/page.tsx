import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import ProductGrid from '@/components/ui/ProductGrid';
import type { Product } from '@/types';

export const metadata: Metadata = {
  title: '강아지 | GIFT PET',
  description: '강아지를 위한 프리미엄 사료, 간식, 용품, 영양제',
};

// 정렬 버튼 목록
const SORT_OPTIONS = ['추천순', '신상순', '낮은가격순', '높은가격순'] as const;
type SortOption = (typeof SORT_OPTIONS)[number];
const ACTIVE_SORT: SortOption = '추천순';

// 더미 상품 데이터 (references/web/v0_item_list.html 기반)
const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    name: '[오프라인 전용] 트럼펫 소프트클로버 스킨앤코트',
    price: 24000,
    imageUrl: '/images/placeholder.svg',
    badges: ['NEW'],
    category: '프리미엄 사료',
  },
  {
    id: '2',
    name: '[오프라인 전용] 트럼펫 소프트클로버 이뮨부스터',
    price: 18500,
    imageUrl: '/images/placeholder.svg',
    badges: ['BEST'],
    category: '건강 간식',
  },
  {
    id: '3',
    name: '[오프라인 전용] 트럼펫 소프트클로버 힙앤조인트',
    price: 32000,
    imageUrl: '/images/placeholder.svg',
    badges: [],
    category: '영양제',
  },
  {
    id: '4',
    name: '위시츄 덴탈집중케어 190g',
    price: 15000,
    imageUrl: '/images/placeholder.svg',
    badges: [],
    category: '덴탈 케어',
  },
  {
    id: '5',
    name: '[오프라인 전용] 헬로마이펫 댕댕 발세정제',
    price: 19800,
    imageUrl: '/images/placeholder.svg',
    badges: [],
    category: '목욕 용품',
  },
  {
    id: '6',
    name: '[오프라인 전용] 헬로마이펫 댕티스트 칫솔',
    price: 8500,
    imageUrl: '/images/placeholder.svg',
    badges: ['HIT'],
    category: '덴탈 케어',
  },
  {
    id: '7',
    name: '[오프라인 전용] 헬로마이펫 댕댕귀세정제',
    price: 16500,
    imageUrl: '/images/placeholder.svg',
    badges: [],
    category: '위생 용품',
  },
  {
    id: '8',
    name: '[오프라인 전용] 헬로마이펫 댕댕눈물세정제',
    price: 14000,
    imageUrl: '/images/placeholder.svg',
    badges: [],
    category: '위생 용품',
  },
];

const TOTAL_COUNT = DUMMY_PRODUCTS.length;

export default function ShopPage() {
  return (
    <>
      <Header />
      <MobileHeader />

      <main className="flex-1 w-full max-w-container mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 pb-28 md:pb-12">

        {/* Category Header */}
        <div className="mb-6 md:mb-12">
          {/* Desktop: centered */}
          <div className="hidden md:block text-center">
            <h1 className="text-headline-lg text-on-background mb-4">모든 상품</h1>
            <p className="text-body-md text-secondary">
              총 <span className="text-primary font-bold">{TOTAL_COUNT}</span>개 상품
            </p>
          </div>

          {/* Mobile: flex between */}
          <div className="md:hidden flex justify-between items-end py-4 border-b border-surface-variant">
            <div>
              <h2 className="text-headline-lg-mobile text-on-surface mb-1">강아지</h2>
              <p className="text-body-md text-on-surface-variant">총 {TOTAL_COUNT}개 상품</p>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 border border-outline-variant rounded-full px-3 py-1.5 text-label-sm text-on-surface hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              필터
            </button>
          </div>
        </div>

        {/* Desktop: Filter / Sort bar */}
        <div className="hidden md:flex justify-between items-center border-b border-surface-variant pb-4 mb-8">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium bg-surface-container-low rounded-full hover:bg-surface-variant transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            필터
          </button>
          <div className="flex gap-6 text-sm text-secondary">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`transition-colors hover:text-primary ${
                  opt === ACTIVE_SORT ? 'font-semibold text-on-background' : ''
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: Sort options (horizontal scroll) */}
        <div className="md:hidden flex gap-4 mb-6 overflow-x-auto pb-2 no-scrollbar">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`text-label-md whitespace-nowrap transition-colors ${
                opt === ACTIVE_SORT ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="mb-10 md:mb-16">
          <ProductGrid products={DUMMY_PRODUCTS} />
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button
            type="button"
            aria-label="Previous page"
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-variant text-secondary transition-colors disabled:opacity-50"
            disabled
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-label-md transition-colors ${
                page === 1
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-secondary hover:bg-surface-container'
              }`}
            >
              {page}
            </button>
          ))}
          <span className="text-on-surface-variant px-1">...</span>
          <button
            type="button"
            aria-label="Next page"
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-variant text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>

      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
