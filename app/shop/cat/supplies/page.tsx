import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import ShopListContent from '@/components/ui/ShopListContent';
import type { Product } from '@/types';

export const metadata: Metadata = {
  title: '고양이 용품 | GIFT PET',
  description: '고양이를 위한 생활 용품',
};

const DUMMY_PRODUCTS: Product[] = [
  { id: '1', name: '냥이조아 스크래처 카펫 하우스', price: 42000, imageUrl: '/images/placeholder.svg', badges: ['NEW'], category: '고양이 용품' },
  { id: '2', name: '헬로캣 모래 벤토나이트 10L', price: 18000, imageUrl: '/images/placeholder.svg', badges: [], category: '위생 용품' },
  { id: '3', name: '캣체이스 깃털 낚싯대 장난감', price: 7500, imageUrl: '/images/placeholder.svg', badges: [], category: '고양이 용품' },
  { id: '4', name: '고양이 자동 급수기 1.5L', price: 38000, imageUrl: '/images/placeholder.svg', badges: ['BEST'], category: '생활 용품' },
];

export default function CatSuppliesPage() {
  return (
    <>
      <Header />
      <MobileHeader />
      <ShopListContent title="고양이 용품" products={DUMMY_PRODUCTS} />
      <Footer />
      <BottomNav />
    </>
  );
}
