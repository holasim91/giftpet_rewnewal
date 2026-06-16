'use client';

import { useState, useRef, useCallback } from 'react';
import StarRating from './StarRating';
import { convertToWebP } from '@/lib/image';
import { createReview, uploadReviewImageAction, deleteReviewImageAction } from '@/actions/review';
import { useToast } from '@/components/ui/Toast';

interface UploadedImage {
  previewUrl: string;
  uploadedUrl: string;
}

interface Props {
  productId: string;
  orderId: string;
  productName: string;
  onClose: () => void;
  onSuccess: (reviewId: string) => void;
}

export default function ReviewWriteModal({ productId, orderId, productName, onClose, onSuccess }: Props) {
  const { showToast } = useToast();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(async () => {
    // 제출하지 않고 닫을 때 업로드된 이미지 정리
    await Promise.allSettled(images.map((img) => deleteReviewImageAction(img.uploadedUrl)));
    onClose();
  }, [images, onClose]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    if (images.length + files.length > 3) {
      showToast('이미지는 최대 3개까지 업로드할 수 있습니다.', 'error');
      return;
    }

    setIsUploading(true);
    for (const file of files) {
      try {
        const blob = await convertToWebP(file);
        const previewUrl = URL.createObjectURL(blob);
        const formData = new FormData();
        formData.append('file', blob, 'review.webp');
        const result = await uploadReviewImageAction(formData);
        if (!result.success) {
          showToast(result.error, 'error');
          URL.revokeObjectURL(previewUrl);
          continue;
        }
        setImages((prev) => [...prev, { previewUrl, uploadedUrl: result.data!.url }]);
      } catch {
        showToast('이미지 처리 중 오류가 발생했습니다.', 'error');
      }
    }
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleRemoveImage(idx: number) {
    const img = images[idx];
    setImages((prev) => prev.filter((_, i) => i !== idx));
    URL.revokeObjectURL(img.previewUrl);
    await deleteReviewImageAction(img.uploadedUrl);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { showToast('별점을 선택해주세요.', 'error'); return; }
    if (content.trim().length < 10) { showToast('리뷰는 최소 10자 이상 작성해주세요.', 'error'); return; }

    setIsSubmitting(true);
    const result = await createReview(productId, orderId, rating, content, images.map((i) => i.uploadedUrl));
    setIsSubmitting(false);

    if (result.success) {
      images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
      showToast('리뷰가 등록되었습니다.', 'success');
      onSuccess(result.data!.reviewId);
    } else {
      showToast(result.error, 'error');
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-[9990]"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9991] flex items-center justify-center px-4 py-8">
        <div
          className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-[0px_10px_30px_rgba(0,0,0,0.12)] max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-outline-variant/30 shrink-0">
            <h2 className="text-headline-sm font-bold text-on-surface">리뷰 작성</h2>
            <button
              type="button"
              onClick={handleClose}
              className="material-symbols-outlined text-tertiary hover:text-on-surface transition-colors"
              aria-label="닫기"
            >
              close
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-5 overflow-y-auto">
            <p className="text-label-md text-on-surface-variant line-clamp-1">{productName}</p>

            {/* 별점 */}
            <div className="space-y-1.5">
              <label className="text-label-md text-on-surface font-semibold">별점</label>
              <StarRating value={rating} onChange={setRating} size="lg" />
            </div>

            {/* 이미지 업로드 */}
            <div className="space-y-2">
              <label className="text-label-md text-on-surface font-semibold">
                이미지 <span className="font-normal text-tertiary">({images.length}/3)</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {images.map((img, idx) => (
                  <div key={img.uploadedUrl} className="relative w-20 h-20 rounded-lg overflow-hidden bg-surface-container-low">
                    {/* blob: URL은 next/image 미지원 — 일반 img 사용 */}
                    <img
                      src={img.previewUrl}
                      alt={`업로드 이미지 ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-0.5 right-0.5 w-5 h-5 bg-inverse-surface/80 rounded-full flex items-center justify-center"
                      aria-label="이미지 삭제"
                    >
                      <span className="material-symbols-outlined text-inverse-on-surface text-[12px] leading-none">close</span>
                    </button>
                  </div>
                ))}

                {images.length < 3 && (
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-1 text-tertiary hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
                  >
                    {isUploading ? (
                      <span className="text-label-sm">업로드 중</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                        <span className="text-label-sm">추가</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* 텍스트 */}
            <div className="space-y-1.5">
              <label htmlFor="review-content" className="text-label-md text-on-surface font-semibold">
                리뷰 내용
              </label>
              <textarea
                id="review-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="상품에 대한 솔직한 리뷰를 남겨주세요. (최소 10자)"
                rows={4}
                className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface placeholder:text-tertiary resize-none focus:outline-none focus:border-primary transition-colors"
              />
              <p className="text-label-sm text-tertiary text-right">{content.length}자</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="w-full py-3.5 bg-primary-container text-on-primary rounded-lg text-label-md font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? '등록 중...' : '리뷰 등록'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
