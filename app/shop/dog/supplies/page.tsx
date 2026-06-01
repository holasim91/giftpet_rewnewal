import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import ShopListContent from '@/components/ui/ShopListContent';
import type { Product } from '@/types';

export const metadata: Metadata = {
  title: '강아지 용품 | GIFT PET',
  description: '강아지를 위한 생활 용품',
};

const DUMMY_PRODUCTS: Product[] = [
  { id: '1', name: '[오프라인 전용] 헬로마이펫 댕댕 발세정제', price: 19800, imageUrl: '/images/placeholder.svg', badges: [], category: '목욕 용품' },
  { id: '2', name: '[오프라인 전용] 헬로마이펫 댕티스트 칫솔', price: 8500, imageUrl: '/images/placeholder.svg', badges: ['HIT'], category: '덴탈 케어' },
  { id: '3', name: '[오프라인 전용] 헬로마이펫 댕댕귀세정제', price: 16500, imageUrl: '/images/placeholder.svg', badges: [], category: '위생 용품' },
  { id: '4', name: '강아지 쿨링 매트 M 사이즈', price: 32000, imageUrl: '/images/placeholder.svg', badges: ['BEST'], category: '생활 용품' },
];

export default function DogSuppliesPage() {
  return (
    <>
      <Header />
      <MobileHeader />
      <ShopListContent title="강아지 용품" products={DUMMY_PRODUCTS} />
      <Footer />
      <BottomNav />
    </>
  );
}
