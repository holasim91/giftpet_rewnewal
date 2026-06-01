import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import ShopListContent from '@/components/ui/ShopListContent';
import type { Product } from '@/types';

export const metadata: Metadata = {
  title: '고양이 | GIFT PET',
  description: '고양이를 위한 프리미엄 간식, 용품',
};

const DUMMY_PRODUCTS: Product[] = [
  { id: '1', name: '캣닙 오가닉 드라이 허브 30g', price: 12000, imageUrl: '/images/placeholder.svg', badges: ['NEW'], category: '건강 간식' },
  { id: '2', name: '고메 퓨레 참치 앤 치킨 15g×4', price: 9800, imageUrl: '/images/placeholder.svg', badges: ['BEST'], category: '건강 간식' },
  { id: '3', name: '냥이조아 스크래처 카펫 하우스', price: 42000, imageUrl: '/images/placeholder.svg', badges: [], category: '고양이 용품' },
  { id: '4', name: '퓨리나 원 성묘 살몬 1.5kg', price: 28000, imageUrl: '/images/placeholder.svg', badges: ['HIT'], category: '고양이 사료' },
  { id: '5', name: '캣체이스 깃털 낚싯대 장난감', price: 7500, imageUrl: '/images/placeholder.svg', badges: [], category: '고양이 용품' },
  { id: '6', name: '헬로캣 모래 벤토나이트 10L', price: 18000, imageUrl: '/images/placeholder.svg', badges: [], category: '위생 용품' },
];

export default function CatShopPage() {
  return (
    <>
      <Header />
      <MobileHeader />
      <ShopListContent title="고양이" products={DUMMY_PRODUCTS} />
      <Footer />
      <BottomNav />
    </>
  );
}
