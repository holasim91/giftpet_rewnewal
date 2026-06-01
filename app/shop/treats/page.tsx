import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import ShopListContent from '@/components/ui/ShopListContent';
import type { Product } from '@/types';

export const metadata: Metadata = {
  title: '간식 | GIFT PET',
  description: '강아지·고양이를 위한 건강 간식',
};

const DUMMY_PRODUCTS: Product[] = [
  { id: '1', name: '[오프라인 전용] 트럼펫 소프트클로버 이뮨부스터', price: 18500, imageUrl: '/images/placeholder.svg', badges: ['BEST'], category: '건강 간식' },
  { id: '2', name: '위시츄 덴탈집중케어 190g', price: 15000, imageUrl: '/images/placeholder.svg', badges: [], category: '덴탈 케어' },
  { id: '3', name: '캣닙 오가닉 드라이 허브 30g', price: 12000, imageUrl: '/images/placeholder.svg', badges: ['NEW'], category: '고양이 간식' },
  { id: '4', name: '고메 퓨레 참치 앤 치킨 15g×4', price: 9800, imageUrl: '/images/placeholder.svg', badges: [], category: '고양이 간식' },
  { id: '5', name: '져스트 드라이드 치킨저키 100g', price: 13500, imageUrl: '/images/placeholder.svg', badges: ['HIT'], category: '건강 간식' },
  { id: '6', name: '퍼피러브 소프트 트릿 믹스 200g', price: 11000, imageUrl: '/images/placeholder.svg', badges: [], category: '건강 간식' },
];

export default function TreatsShopPage() {
  return (
    <>
      <Header />
      <MobileHeader />
      <ShopListContent title="간식" products={DUMMY_PRODUCTS} />
      <Footer />
      <BottomNav />
    </>
  );
}
