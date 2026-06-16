'use client';

import { useState } from 'react';
import Image from 'next/image';
import StarRating from '@/components/review/StarRating';
import ReviewCard from '@/components/review/ReviewCard';
import type { Product, ReviewForDisplay } from '@/types';

interface Props {
  product: Product;
  initialReviews: ReviewForDisplay[];
}

export default function ProductTabs({ product, initialReviews }: Props) {
  const [desktopTab, setDesktopTab] = useState(0);
  const [mobileTab, setMobileTab] = useState(0);
  const [reviews, setReviews] = useState<ReviewForDisplay[]>(initialReviews);

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const DESKTOP_TABS = [
    'Product Description',
    `Reviews (${reviews.length})`,
    'Q&A (0)',
    'Shipping Info',
    'Returns/Exchange',
  ];
  const MOBILE_TABS = ['상세정보', `리뷰 (${reviews.length})`, 'Q&A'];

  function handleDeleted(id: string) {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <>
      {/* Desktop tabs */}
      <div className="hidden md:block w-full">
        <div className="border-b border-surface-variant flex gap-8 overflow-x-auto no-scrollbar text-label-md">
          {DESKTOP_TABS.map((tab, i) => (
            <button
              key={tab}
              type="button"
              onClick={() => setDesktopTab(i)}
              className={`pb-4 whitespace-nowrap transition-colors ${
                i === desktopTab
                  ? 'text-on-surface border-b-2 border-on-surface'
                  : 'text-secondary hover:text-on-surface'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {desktopTab === 0 && (
          <div className="py-12 flex flex-col items-center gap-8">
            <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow-sm bg-surface-container-low">
              <Image
                src={product.imageUrl}
                alt="상품 상세 이미지"
                width={672}
                height={672}
                className="w-full object-cover"
              />
            </div>
            {product.description && (
              <div className="w-full max-w-2xl bg-surface-container-low p-6 rounded-xl border border-surface-variant">
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        )}

        {desktopTab === 1 && (
          <ReviewSection reviews={reviews} avgRating={avgRating} onDeleted={handleDeleted} />
        )}

        {desktopTab !== 0 && desktopTab !== 1 && (
          <div className="py-20 text-center text-body-md text-on-surface-variant">
            해당 내용은 준비 중입니다.
          </div>
        )}
      </div>

      {/* Mobile tabs */}
      <div className="md:hidden mt-2 bg-surface-container-lowest shadow-[0px_4px_20px_rgba(0,0,0,0.02)]">
        <div className="flex border-b border-surface-variant px-margin-mobile overflow-x-auto no-scrollbar">
          {MOBILE_TABS.map((tab, i) => (
            <button
              key={tab}
              type="button"
              onClick={() => setMobileTab(i)}
              className={`flex-1 py-4 text-center text-label-md whitespace-nowrap transition-colors ${
                i === mobileTab
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {mobileTab === 0 && (
          <div className="px-margin-mobile py-6 flex flex-col gap-6">
            {product.description && (
              <p className="text-body-md text-on-surface-variant leading-relaxed text-center">
                {product.description}
              </p>
            )}
            <div className="w-full aspect-video bg-surface-container rounded-xl overflow-hidden">
              <Image
                src={product.imageUrl}
                alt="상품 상세 이미지"
                width={400}
                height={225}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {mobileTab === 1 && (
          <div className="px-margin-mobile py-6">
            <ReviewSection reviews={reviews} avgRating={avgRating} onDeleted={handleDeleted} />
          </div>
        )}

        {mobileTab === 2 && (
          <div className="py-16 text-center text-body-md text-on-surface-variant">
            해당 내용은 준비 중입니다.
          </div>
        )}
      </div>
    </>
  );
}

function ReviewSection({
  reviews,
  avgRating,
  onDeleted,
}: {
  reviews: ReviewForDisplay[];
  avgRating: number;
  onDeleted: (id: string) => void;
}) {
  return (
    <div className="py-8 space-y-6">
      {/* 요약 */}
      <div className="flex items-center gap-4 pb-4 border-b border-outline-variant/30">
        <span className="text-headline-md font-bold text-on-surface">
          {avgRating > 0 ? avgRating.toFixed(1) : '-'}
        </span>
        <div className="space-y-0.5">
          <StarRating value={Math.round(avgRating)} readonly size="sm" />
          <p className="text-label-sm text-on-surface-variant">리뷰 {reviews.length}개</p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="py-16 text-center text-body-md text-on-surface-variant">
          아직 리뷰가 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} onDeleted={onDeleted} />
          ))}
        </div>
      )}
    </div>
  );
}
