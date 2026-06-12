import Link from 'next/link';
import type { Product } from '@/types';
import SuggestionsSection from './SuggestionsSection';

interface Props {
  suggestions: Product[];
}

export default function EmptyCart({ suggestions }: Props) {
  return (
    <main className="min-h-[60vh]">
      <div className="flex flex-col items-center justify-center py-20 px-margin-mobile text-center gap-6">
        <div className="w-28 h-28 bg-surface-container rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-6xl text-surface-dim">
            shopping_cart
          </span>
        </div>
        <div>
          <h1 className="text-headline-md text-on-surface mb-2">
            장바구니에 담긴 상품이 없습니다.
          </h1>
          <p className="text-body-md text-secondary">
            GIFT PET의 다양한 상품을 확인하고 장바구니에 담아보세요!
          </p>
        </div>
        <Link
          href="/shop"
          className="mt-2 px-8 py-4 bg-primary text-on-primary rounded-lg text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm"
        >
          쇼핑하러 가기
        </Link>
      </div>

      <SuggestionsSection products={suggestions} />
    </main>
  );
}
