'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import StarRating from './StarRating';
import ImageLightbox from './ImageLightbox';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { getMyReview, deleteReview } from '@/actions/review';
import { useToast } from '@/components/ui/Toast';
import type { MyReviewDetail } from '@/actions/review';

interface Props {
  reviewId: string;
  productName: string;
  onClose: () => void;
  onDeleted: () => void;
}

export default function ReviewViewModal({ reviewId, productName, onClose, onDeleted }: Props) {
  const { showToast } = useToast();
  const [review, setReview] = useState<MyReviewDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getMyReview(reviewId).then((data) => {
      setReview(data);
      setIsLoading(false);
    });
  }, [reviewId]);

  async function handleDelete() {
    setIsDeleting(true);
    const result = await deleteReview(reviewId);
    setIsDeleting(false);
    setConfirmOpen(false);
    if (result.success) {
      showToast('리뷰가 삭제되었습니다.', 'success');
      onDeleted();
    } else {
      showToast(result.error, 'error');
    }
  }

  const date = review
    ? new Date(review.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-[9980]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9981] flex items-center justify-center px-4 py-8">
        <div
          className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-[0px_10px_30px_rgba(0,0,0,0.12)] max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-outline-variant/30 shrink-0">
            <h2 className="text-headline-sm font-bold text-on-surface">내 리뷰</h2>
            <button
              type="button"
              onClick={onClose}
              className="material-symbols-outlined text-tertiary hover:text-on-surface transition-colors"
              aria-label="닫기"
            >
              close
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-5 px-6 py-5 overflow-y-auto flex-1">
            {isLoading ? (
              <div className="py-16 flex items-center justify-center">
                <span className="text-body-md text-on-surface-variant">불러오는 중...</span>
              </div>
            ) : !review ? (
              <div className="py-16 flex items-center justify-center">
                <span className="text-body-md text-on-surface-variant">리뷰를 찾을 수 없습니다.</span>
              </div>
            ) : (
              <>
                <p className="text-label-md text-on-surface-variant line-clamp-1 pb-0.5">{productName}</p>

                {/* 별점 + 날짜 */}
                <div className="flex items-center gap-3">
                  <StarRating value={review.rating} readonly size="md" />
                  <span className="text-label-sm text-on-surface-variant">{date}</span>
                </div>

                {/* 이미지 */}
                {review.imageUrls.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {review.imageUrls.map((url) => (
                      <button
                        key={url}
                        type="button"
                        onClick={() => setLightboxUrl(url)}
                        className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface-container-low flex-shrink-0 hover:opacity-90 transition-opacity"
                      >
                        <Image
                          src={url}
                          alt="리뷰 이미지"
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* 리뷰 내용 */}
                <p className="text-body-md text-on-surface leading-relaxed whitespace-pre-line">
                  {review.content}
                </p>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-3 px-6 pb-6 pt-4 border-t border-outline-variant/30 shrink-0">
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              disabled={isLoading || !review}
              className="flex-1 py-3 bg-error text-on-error rounded-lg text-label-md font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              삭제
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-outline-variant rounded-lg text-label-md text-on-surface hover:bg-surface-container-high transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>

      {lightboxUrl && (
        <ImageLightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} />
      )}

      <ConfirmModal
        isOpen={confirmOpen}
        message="리뷰를 삭제하시겠습니까?"
        confirmLabel="삭제"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        isPending={isDeleting}
      />
    </>
  );
}
