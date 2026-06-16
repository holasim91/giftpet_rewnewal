'use client';

import { useState } from 'react';
import Image from 'next/image';
import ReviewWriteModal from '@/components/review/ReviewWriteModal';
import ReviewViewModal from '@/components/review/ReviewViewModal';
import type { OrderWithItems } from '@/actions/order';
import type { ReviewedKey } from '@/types';

const STATUS_LABEL: Record<string, string> = {
  PENDING: '결제 대기',
  PAID: '상품 준비중',
  SHIPPING: '배송중',
  DELIVERED: '배송 완료',
  CANCELLED: '취소됨',
};

const STATUS_STYLE: Record<string, string> = {
  PENDING: 'bg-surface-container text-secondary',
  PAID: 'bg-primary-fixed text-on-primary-fixed-variant',
  SHIPPING: 'bg-[#4E7CAE] text-white',
  DELIVERED: 'bg-surface-container-highest text-on-surface-variant',
  CANCELLED: 'bg-error-container text-on-error-container',
};

const REVIEWABLE_STATUSES = new Set(['DELIVERED']);

interface ReviewTarget {
  productId: string;
  orderId: string;
  productName: string;
}

interface ViewTarget {
  reviewId: string;
  productName: string;
  orderId: string;
  productId: string;
}

interface Props {
  orders: OrderWithItems[];
  initialReviewedKeys: ReviewedKey[];
}

const PAGE_SIZE = 3;

export default function OrderHistory({ orders, initialReviewedKeys }: Props) {
  const [reviewedKeys, setReviewedKeys] = useState<ReviewedKey[]>(initialReviewedKeys);
  const [writeTarget, setWriteTarget] = useState<ReviewTarget | null>(null);
  const [viewTarget, setViewTarget] = useState<ViewTarget | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  function getReviewedKey(orderId: string, productId: string) {
    return reviewedKeys.find((k) => k.orderId === orderId && k.productId === productId) ?? null;
  }

  function handleWriteSuccess(reviewId: string) {
    if (!writeTarget) return;
    setReviewedKeys((prev) => [
      ...prev,
      { reviewId, orderId: writeTarget.orderId, productId: writeTarget.productId },
    ]);
    setWriteTarget(null);
  }

  function handleDeleted() {
    if (!viewTarget) return;
    setReviewedKeys((prev) =>
      prev.filter((k) => k.reviewId !== viewTarget.reviewId),
    );
    setViewTarget(null);
  }

  return (
    <>
      <div className="bg-surface-container-lowest rounded-xl p-6 md:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container">
        <h2 className="text-headline-sm flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-primary">shopping_bag</span>
          주문 내역
          {orders.length > 0 && (
            <span className="text-label-md font-normal text-on-surface-variant ml-1">
              {orders.length}건
            </span>
          )}
        </h2>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[32px] text-tertiary">shopping_bag</span>
            </div>
            <p className="text-body-md text-on-surface-variant">아직 주문 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, visibleCount).map((order) => {
              const orderNumber = order.id.slice(0, 8).toUpperCase();
              const date = new Date(order.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
              const canReview = REVIEWABLE_STATUSES.has(order.status);

              return (
                <div
                  key={order.id}
                  className="border border-outline-variant/50 rounded-xl p-4 space-y-3"
                >
                  {/* 주문 헤더 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-label-md font-semibold text-on-surface">
                        #{orderNumber}
                      </p>
                      <p className="text-label-sm text-on-surface-variant mt-0.5">{date}</p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-label-sm font-semibold ${
                        STATUS_STYLE[order.status] ?? STATUS_STYLE.PAID
                      }`}
                    >
                      {STATUS_LABEL[order.status] ?? order.status}
                    </span>
                  </div>

                  {/* 상품 목록 + 리뷰 버튼 */}
                  <div className="space-y-2 pt-1">
                    {order.items.map((item) => {
                      const reviewedKey = getReviewedKey(order.id, item.productId);
                      return (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-surface-container">
                            <Image
                              src={item.imageUrl}
                              alt={item.productName}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-label-md font-semibold text-on-surface truncate pb-0.5">
                              {item.productName}
                            </p>
                            <p className="text-label-sm text-on-surface-variant mt-0.5">
                              수량: {item.quantity}
                            </p>
                          </div>
                          {canReview && (
                            reviewedKey ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setViewTarget({
                                    reviewId: reviewedKey.reviewId,
                                    productName: item.productName,
                                    orderId: order.id,
                                    productId: item.productId,
                                  })
                                }
                                className="shrink-0 px-2.5 py-1 rounded-full text-label-sm bg-surface-container text-tertiary hover:bg-surface-container-high transition-colors"
                              >
                                리뷰 완료
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  setWriteTarget({
                                    productId: item.productId,
                                    orderId: order.id,
                                    productName: item.productName,
                                  })
                                }
                                className="shrink-0 px-2.5 py-1 rounded-full text-label-sm bg-primary-fixed text-on-primary-fixed-variant hover:bg-primary-fixed-dim transition-colors"
                              >
                                리뷰 작성
                              </button>
                            )
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* 결제 금액 */}
                  <div className="flex justify-end pt-2 border-t border-outline-variant/30">
                    <span className="text-label-md font-bold text-primary">
                      총 {order.totalAmount.toLocaleString()}원
                    </span>
                  </div>
                </div>
              );
            })}
            {visibleCount < orders.length && (
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="w-full py-3 rounded-lg border border-outline-variant text-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors"
              >
                더보기 ({orders.length - visibleCount}건 남음)
              </button>
            )}
          </div>
        )}
      </div>

      {writeTarget && (
        <ReviewWriteModal
          productId={writeTarget.productId}
          orderId={writeTarget.orderId}
          productName={writeTarget.productName}
          onClose={() => setWriteTarget(null)}
          onSuccess={handleWriteSuccess}
        />
      )}

      {viewTarget && (
        <ReviewViewModal
          reviewId={viewTarget.reviewId}
          productName={viewTarget.productName}
          onClose={() => setViewTarget(null)}
          onDeleted={handleDeleted}
        />
      )}
    </>
  );
}
