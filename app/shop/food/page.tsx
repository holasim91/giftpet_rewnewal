import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import ShopListContent from '@/components/ui/ShopListContent';
import type { Product } from '@/types';

export const metadata: Metadata = {
  title: '사료 | GIFT PET',
  description: '강아지·고양이를 위한 프리미엄 사료',
};

const DUMMY_PRODUCTS: Product[] = [
  { id: '1', name: '[오프라인 전용] 트럼펫 소프트클로버 스킨앤코트', price: 24000, imageUrl: '/images/placeholder.jpg', badges: ['NEW'], animalCategory: null, productCategory: 'food', description: null, detailContent: null, discountPrice: null, stock: 0 },
  { id: '2', name: '오리젠 오리지널 그레인프리 11.4kg', price: 89000, imageUrl: '/images/placeholder.jpg', badges: ['BEST'], animalCategory: null, productCategory: 'food', description: null, detailContent: null, discountPrice: null, stock: 0 },
  { id: '3', name: '퓨리나 원 성묘 살몬 1.5kg', price: 28000, imageUrl: '/images/placeholder.jpg', badges: ['HIT'], animalCategory: null, productCategory: 'food', description: null, detailContent: null, discountPrice: null, stock: 0 },
  { id: '4', name: '로얄캐닌 미니 어덜트 8kg', price: 62000, imageUrl: '/images/placeholder.jpg', badges: [], animalCategory: null, productCategory: 'food', description: null, detailContent: null, discountPrice: null, stock: 0 },
  { id: '5', name: '내추럴코어 유기농 치킨 1.6kg', price: 34000, imageUrl: '/images/placeholder.jpg', badges: [], animalCategory: null, productCategory: 'food', description: null, detailContent: null, discountPrice: null, stock: 0 },
  { id: '6', name: '아카나 클래식 퍼시픽 필하드 340g', price: 16500, imageUrl: '/images/placeholder.jpg', badges: [], animalCategory: null, productCategory: 'food', description: null, detailContent: null, discountPrice: null, stock: 0 },
];

export default function FoodShopPage() {
  return (
    <>
      <Header />
      <MobileHeader />
      <ShopListContent title="사료" products={DUMMY_PRODUCTS} />
      <Footer />
      <BottomNav />
    </>
  );
}
