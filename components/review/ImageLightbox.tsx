'use client';

import Image from 'next/image';
import { useEffect } from 'react';

interface Props {
  url: string;
  onClose: () => void;
}

export default function ImageLightbox({ url, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9985] flex items-center justify-center bg-inverse-surface/80 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute top-4 right-4 text-inverse-on-surface material-symbols-outlined text-[32px]"
        onClick={onClose}
        aria-label="닫기"
      >
        close
      </button>
      <div
        className="relative max-w-2xl w-full aspect-square"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={url}
          alt="리뷰 이미지 확대"
          fill
          className="object-contain rounded-xl"
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>
    </div>
  );
}
