import type { Metadata } from 'next';
import Link from 'next/link';
import WishlistClient from './WishlistClient';
import { getWishlist } from '@/actions/wishlist';

export const metadata: Metadata = {
  title: '찜 목록 | GIFT PET',
  description: '내가 찜한 상품 목록',
};

export default async function WishlistPage() {
  const items = await getWishlist();
  const products = items.map((item) => item.product);
  const totalCount = products.length;

  return (
    <main className="flex-1 w-full max-w-container mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 pb-28 md:pb-12">

      {/* Header */}
      <div className="mb-6 md:mb-10">
        {/* Desktop */}
        <div className="hidden md:block text-center">
          <h1 className="text-headline-lg text-on-background mb-4">찜 목록</h1>
          <p className="text-body-md text-secondary">
            총 <span className="text-primary font-bold">{totalCount}</span>개 상품
          </p>
        </div>
        {/* Mobile */}
        <div className="md:hidden py-4 border-b border-surface-variant">
          <h2 className="text-headline-lg-mobile text-on-surface mb-1">찜 목록</h2>
          <p className="text-body-md text-on-surface-variant">총 {totalCount}개 상품</p>
        </div>
      </div>

      {totalCount === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
          <div className="w-28 h-28 bg-surface-container rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-surface-dim">favorite</span>
          </div>
          <div>
            <h2 className="text-headline-md text-on-surface mb-2">찜한 상품이 없습니다.</h2>
            <p className="text-body-md text-secondary">
              GIFT PET의 다양한 상품을 둘러보고 마음에 드는 상품을 찜해보세요!
            </p>
          </div>
          <Link
            href="/shop"
            className="mt-2 px-8 py-4 bg-primary text-on-primary rounded-lg text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm"
          >
            쇼핑하러 가기
          </Link>
        </div>
      ) : (
        <WishlistClient products={products} />
      )}
    </main>
  );
}
