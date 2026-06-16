'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CircularItem from '@/components/ui/CircularItem';
import type { Product, CircularRecommendation } from '@/types';

const BG_COLORS = [
  'bg-primary-fixed',
  'bg-primary-fixed-dim',
  'bg-outline-variant',
  'bg-surface-container',
];

// 원형 아이템 너비(128px) + gap(48px)
const SCROLL_AMOUNT = 128 + 48;

interface MdRecommendationProps {
  products: Product[];
}

export default function MdRecommendation({ products }: MdRecommendationProps) {
  const items: CircularRecommendation[] = products.map((p, i) => ({
    id: p.id,
    label: p.name,
    imageUrl: p.imageUrl,
    bgColor: BG_COLORS[i % BG_COLORS.length],
  }));

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const rafId = useRef<number | null>(null);
  const pendingDelta = useRef(0);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const visibleWidth = el.clientWidth || el.offsetWidth;
    if (visibleWidth === 0) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(Math.ceil(el.scrollLeft + visibleWidth) < el.scrollWidth);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateScrollState]);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.pageX - el.offsetLeft;
    dragScrollLeft.current = el.scrollLeft;
    el.style.scrollSnapType = 'none';
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const delta = dragStartX.current - x;
    if (Math.abs(delta) > 5) hasDragged.current = true;
    pendingDelta.current = delta;
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      if (scrollRef.current && isDragging.current) {
        scrollRef.current.scrollLeft = dragScrollLeft.current + pendingDelta.current;
      }
      rafId.current = null;
    });
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    if (scrollRef.current) {
      scrollRef.current.style.scrollSnapType = '';
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.stopPropagation();
      e.preventDefault();
      hasDragged.current = false;
    }
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Desktop */}
      <section className="hidden md:block bg-surface-container-lowest py-8 rounded-2xl">
        <div className="flex justify-between items-center mb-8 px-8">
          <h2 className="text-headline-md text-on-surface">MD 추천</h2>
          <div className="flex space-x-2">
            <button
              type="button"
              aria-label="이전"
              onClick={() => scroll('left')}
              className={`w-10 h-10 rounded-full border border-surface-container-high flex items-center justify-center hover:border-primary-container hover:text-primary-container transition-all duration-200 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              type="button"
              aria-label="다음"
              onClick={() => scroll('right')}
              className={`w-10 h-10 rounded-full border border-surface-container-high flex items-center justify-center hover:border-primary-container hover:text-primary-container transition-all duration-200 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onClickCapture={onClickCapture}
          className="flex overflow-x-auto gap-12 pb-2 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none justify-center px-8"
        >
          {items.map((item) => (
            <div key={item.id} className="snap-start shrink-0">
              <CircularItem item={item} />
            </div>
          ))}
        </div>
      </section>

      {/* Mobile */}
      <section className="md:hidden py-8 bg-surface-container-lowest">
        <div className="px-margin-mobile mb-4">
          <h3 className="text-headline-sm text-on-surface">MD 추천</h3>
          <p className="text-body-md text-[14px] text-on-surface-variant mt-1">
            이 계절에 딱 맞는 MD 엄선 상품
          </p>
        </div>
        <div className="pl-margin-mobile flex space-x-6 overflow-x-auto no-scrollbar pb-4 pr-margin-mobile">
          {items.map((item) => (
            <Link key={item.id} href={`/shop/product/${item.id}`} className="flex flex-col items-center flex-shrink-0 w-24">
              <div className="w-20 h-20 rounded-full bg-surface-container overflow-hidden mb-3 shadow-sm border border-outline-variant/30">
                <Image
                  src={item.imageUrl}
                  alt={item.label}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-label-md text-on-surface text-center leading-tight">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
