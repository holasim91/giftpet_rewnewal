'use client';

import { useState } from 'react';
import Image from 'next/image';
import StarRating from './StarRating';
import ImageLightbox from './ImageLightbox';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { deleteReview } from '@/actions/review';
import { useToast } from '@/components/ui/Toast';
import type { ReviewForDisplay } from '@/types';

interface Props {
  review: ReviewForDisplay;
  onDeleted: (id: string) => void;
}

export default function ReviewCard({ review, onDeleted }: Props) {
  const { showToast } = useToast();
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const date = new Date(review.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  async function handleDelete() {
    setIsPending(true);
    const result = await deleteReview(review.id);
    setIsPending(false);
    setConfirmOpen(false);
    if (result.success) {
      showToast('리뷰가 삭제되었습니다.', 'success');
      onDeleted(review.id);
    } else {
      showToast(result.error, 'error');
    }
  }

  return (
    <>
      <div className="border border-outline-variant/40 rounded-xl p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <StarRating value={review.rating} readonly size="sm" />
              <span className="text-label-sm text-on-surface-variant">{date}</span>
            </div>
            <p className="text-label-md font-semibold text-on-surface">{review.authorName}</p>
          </div>
          {review.isMyReview && (
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="text-label-sm text-tertiary hover:text-error transition-colors shrink-0"
            >
              삭제
            </button>
          )}
        </div>

        <p className="text-body-md text-on-surface leading-relaxed whitespace-pre-line">{review.content}</p>

        {review.imageUrls.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {review.imageUrls.map((url) => (
              <button
                key={url}
                type="button"
                onClick={() => setLightboxUrl(url)}
                className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface-container-low flex-shrink-0 hover:opacity-90 transition-opacity"
              >
                <Image src={url} alt="리뷰 이미지" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxUrl && <ImageLightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} />}

      <ConfirmModal
        isOpen={confirmOpen}
        message="리뷰를 삭제하시겠습니까?"
        confirmLabel="삭제"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        isPending={isPending}
      />
    </>
  );
}
