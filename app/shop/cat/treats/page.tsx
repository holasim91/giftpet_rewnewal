import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import ShopListContent from '@/components/ui/ShopListContent';
import type { Product } from '@/types';

export const metadata: Metadata = {
  title: '고양이 간식 | GIFT PET',
  description: '고양이를 위한 건강 간식',
};

const DUMMY_PRODUCTS: Product[] = [
  { id: '1', name: '캣닙 오가닉 드라이 허브 30g', price: 12000, imageUrl: '/images/placeholder.svg', badges: ['NEW'], category: '고양이 간식' },
  { id: '2', name: '고메 퓨레 참치 앤 치킨 15g×4', price: 9800, imageUrl: '/images/placeholder.svg', badges: ['BEST'], category: '고양이 간식' },
  { id: '3', name: '치즈 크런치 고양이 간식 50g', price: 6500, imageUrl: '/images/placeholder.svg', badges: [], category: '고양이 간식' },
  { id: '4', name: '참치 포 고양이 습식 간식 85g×6', price: 14000, imageUrl: '/images/placeholder.svg', badges: ['HIT'], category: '고양이 간식' },
];

export default function CatTreatsPage() {
  return (
    <>
      <Header />
      <MobileHeader />
      <ShopListContent title="고양이 간식" products={DUMMY_PRODUCTS} />
      <Footer />
      <BottomNav />
    </>
  );
}
