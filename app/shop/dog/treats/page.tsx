import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import ShopListContent from '@/components/ui/ShopListContent';
import type { Product } from '@/types';

export const metadata: Metadata = {
  title: '강아지 간식 | GIFT PET',
  description: '강아지를 위한 건강 간식',
};

const DUMMY_PRODUCTS: Product[] = [
  { id: '1', name: '[오프라인 전용] 트럼펫 소프트클로버 이뮨부스터', price: 18500, imageUrl: '/images/placeholder.svg', badges: ['BEST'], category: '건강 간식' },
  { id: '2', name: '위시츄 덴탈집중케어 190g', price: 15000, imageUrl: '/images/placeholder.svg', badges: [], category: '덴탈 케어' },
  { id: '3', name: '져스트 드라이드 치킨저키 100g', price: 13500, imageUrl: '/images/placeholder.svg', badges: ['HIT'], category: '건강 간식' },
  { id: '4', name: '퍼피러브 소프트 트릿 믹스 200g', price: 11000, imageUrl: '/images/placeholder.svg', badges: [], category: '건강 간식' },
];

export default function DogTreatsPage() {
  return (
    <>
      <Header />
      <MobileHeader />
      <ShopListContent title="강아지 간식" products={DUMMY_PRODUCTS} />
      <Footer />
      <BottomNav />
    </>
  );
}
