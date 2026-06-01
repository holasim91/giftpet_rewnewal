import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import ShopListContent from '@/components/ui/ShopListContent';
import type { Product } from '@/types';

export const metadata: Metadata = {
  title: '영양제 | GIFT PET',
  description: '강아지·고양이를 위한 건강 영양제',
};

const DUMMY_PRODUCTS: Product[] = [
  { id: '1', name: '[오프라인 전용] 트럼펫 소프트클로버 힙앤조인트', price: 32000, imageUrl: '/images/placeholder.svg', badges: [], category: '관절 영양제' },
  { id: '2', name: '[오프라인 전용] 트럼펫 소프트클로버 스킨앤코트', price: 24000, imageUrl: '/images/placeholder.svg', badges: ['NEW'], category: '피부 영양제' },
  { id: '3', name: '뉴트리베이스 프로바이오틱스 60캡슐', price: 38000, imageUrl: '/images/placeholder.svg', badges: ['BEST'], category: '소화 영양제' },
  { id: '4', name: '오메가3 피시오일 강아지용 120ml', price: 27000, imageUrl: '/images/placeholder.svg', badges: [], category: '피부 영양제' },
  { id: '5', name: '고양이 멀티비타민 60정', price: 22000, imageUrl: '/images/placeholder.svg', badges: ['HIT'], category: '종합 영양제' },
  { id: '6', name: '시니어 케어 플러스 관절·눈 60정', price: 45000, imageUrl: '/images/placeholder.svg', badges: [], category: '시니어 영양제' },
];

export default function SupplementsShopPage() {
  return (
    <>
      <Header />
      <MobileHeader />
      <ShopListContent title="영양제" products={DUMMY_PRODUCTS} />
      <Footer />
      <BottomNav />
    </>
  );
}
