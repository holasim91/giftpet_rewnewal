import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import ShopListContent from '@/components/ui/ShopListContent';
import type { Product } from '@/types';

export const metadata: Metadata = {
  title: '강아지 | GIFT PET',
  description: '강아지를 위한 프리미엄 사료, 간식, 용품, 영양제',
};

const DUMMY_PRODUCTS: Product[] = [
  { id: '1', name: '[오프라인 전용] 트럼펫 소프트클로버 스킨앤코트', price: 24000, imageUrl: '/images/placeholder.svg', badges: ['NEW'], category: '프리미엄 사료' },
  { id: '2', name: '[오프라인 전용] 트럼펫 소프트클로버 이뮨부스터', price: 18500, imageUrl: '/images/placeholder.svg', badges: ['BEST'], category: '건강 간식' },
  { id: '3', name: '[오프라인 전용] 트럼펫 소프트클로버 힙앤조인트', price: 32000, imageUrl: '/images/placeholder.svg', badges: [], category: '영양제' },
  { id: '4', name: '위시츄 덴탈집중케어 190g', price: 15000, imageUrl: '/images/placeholder.svg', badges: [], category: '덴탈 케어' },
  { id: '5', name: '[오프라인 전용] 헬로마이펫 댕댕 발세정제', price: 19800, imageUrl: '/images/placeholder.svg', badges: [], category: '목욕 용품' },
  { id: '6', name: '[오프라인 전용] 헬로마이펫 댕티스트 칫솔', price: 8500, imageUrl: '/images/placeholder.svg', badges: ['HIT'], category: '덴탈 케어' },
  { id: '7', name: '[오프라인 전용] 헬로마이펫 댕댕귀세정제', price: 16500, imageUrl: '/images/placeholder.svg', badges: [], category: '위생 용품' },
  { id: '8', name: '[오프라인 전용] 헬로마이펫 댕댕눈물세정제', price: 14000, imageUrl: '/images/placeholder.svg', badges: [], category: '위생 용품' },
];

export default function DogShopPage() {
  return (
    <>
      <Header />
      <MobileHeader />
      <ShopListContent title="강아지" products={DUMMY_PRODUCTS} />
      <Footer />
      <BottomNav />
    </>
  );
}
