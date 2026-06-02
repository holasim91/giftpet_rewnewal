import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import ShopListContent from '@/components/ui/ShopListContent';
import type { Product } from '@/types';

export const metadata: Metadata = {
  title: '용품 | GIFT PET',
  description: '강아지·고양이를 위한 생활 용품',
};

const DUMMY_PRODUCTS: Product[] = [
  { id: '1', name: '[오프라인 전용] 헬로마이펫 댕댕 발세정제', price: 19800, imageUrl: '/images/placeholder.jpg', badges: [], animalCategory: 'dog', productCategory: 'supplies', description: null, detailContent: null, discountPrice: null, stock: 0 },
  { id: '2', name: '[오프라인 전용] 헬로마이펫 댕티스트 칫솔', price: 8500, imageUrl: '/images/placeholder.jpg', badges: ['HIT'], animalCategory: 'dog', productCategory: 'supplies', description: null, detailContent: null, discountPrice: null, stock: 0 },
  { id: '3', name: '[오프라인 전용] 헬로마이펫 댕댕귀세정제', price: 16500, imageUrl: '/images/placeholder.jpg', badges: [], animalCategory: 'dog', productCategory: 'supplies', description: null, detailContent: null, discountPrice: null, stock: 0 },
  { id: '4', name: '[오프라인 전용] 헬로마이펫 댕댕눈물세정제', price: 14000, imageUrl: '/images/placeholder.jpg', badges: [], animalCategory: 'dog', productCategory: 'supplies', description: null, detailContent: null, discountPrice: null, stock: 0 },
  { id: '5', name: '냥이조아 스크래처 카펫 하우스', price: 42000, imageUrl: '/images/placeholder.jpg', badges: ['NEW'], animalCategory: 'cat', productCategory: 'supplies', description: null, detailContent: null, discountPrice: null, stock: 0 },
  { id: '6', name: '헬로캣 모래 벤토나이트 10L', price: 18000, imageUrl: '/images/placeholder.jpg', badges: [], animalCategory: 'cat', productCategory: 'supplies', description: null, detailContent: null, discountPrice: null, stock: 0 },
  { id: '7', name: '캣체이스 깃털 낚싯대 장난감', price: 7500, imageUrl: '/images/placeholder.jpg', badges: [], animalCategory: 'cat', productCategory: 'supplies', description: null, detailContent: null, discountPrice: null, stock: 0 },
  { id: '8', name: '강아지 쿨링 매트 M 사이즈', price: 32000, imageUrl: '/images/placeholder.jpg', badges: ['BEST'], animalCategory: 'dog', productCategory: 'supplies', description: null, detailContent: null, discountPrice: null, stock: 0 },
];

export default function SuppliesShopPage() {
  return (
    <>
      <Header />
      <MobileHeader />
      <ShopListContent title="용품" products={DUMMY_PRODUCTS} />
      <Footer />
      <BottomNav />
    </>
  );
}
