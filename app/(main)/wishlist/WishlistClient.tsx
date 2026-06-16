'use client';

import { useOptimistic, useState, useTransition } from 'react';
import Link from 'next/link';
import { addToCart } from '@/actions/cart';
import { toggleWishlist } from '@/actions/wishlist';
import { useToast } from '@/components/ui/Toast';
import { useWishlist } from '@/components/wishlist/WishlistProvider';
import ProductCardBase from '@/components/ui/ProductCardBase';
import type { Product } from '@/types';

interface Props {
  products: Product[];
}

const isSoldOut = (p: Product) => !p.isActive || p.stock === 0;

export default function WishlistClient({ products }: Props) {
  const [optimisticProducts, removeOptimistic] = useOptimistic(
    products,
    (state: Product[], removedId: string) => state.filter((p) => p.id !== removedId),
  );

  const addableIds = optimisticProducts.filter((p) => !isSoldOut(p)).map((p) => p.id);

  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [cardPendingIds, setCardPendingIds] = useState<Set<string>>(new Set());
  const [isBulkPending, startBulk] = useTransition();
  const [, startRemove] = useTransition();
  const { showToast } = useToast();
  const { removeId } = useWishlist();

  const allChecked = addableIds.length > 0 && checked.size === addableIds.length;

  const toggleAll = (v: boolean) => setChecked(v ? new Set(addableIds) : new Set());

  const toggleOne = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleAddOne = (productId: string) => {
    setCardPendingIds((prev) => new Set(prev).add(productId));
    startBulk(async () => {
      const result = await addToCart(productId, 1);
      setCardPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
      if (result.success) {
        setChecked((prev) => new Set(prev).add(productId));
        showToast('장바구니에 추가되었습니다', 'success');
      } else {
        showToast('담기에 실패했습니다', 'error');
      }
    });
  };

  const handleAddSelected = () => {
    const ids = [...checked];
    if (ids.length === 0) return;
    startBulk(async () => {
      const results = await Promise.all(ids.map((id) => addToCart(id, 1)));
      const failed = results.filter((r) => !r.success).length;
      if (failed === 0) showToast('장바구니에 추가되었습니다', 'success');
      else showToast(`${failed}개 상품을 담지 못했습니다`, 'error');
    });
  };

  const handleRemove = (productId: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
    startRemove(async () => {
      removeOptimistic(productId);
      const result = await toggleWishlist(productId);
      if (!result.success) {
        showToast('오류가 발생했습니다', 'error');
      } else {
        removeId(productId);
        showToast('찜 목록에서 삭제되었습니다', 'success');
      }
    });
  };

  if (optimisticProducts.length === 0) {
    return (
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
    );
  }

  return (
    <>
      {/* Toolbar: 전체 선택 + 선택 담기 */}
      <div className="flex items-center justify-between py-3 mb-4 border-b border-surface-variant">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={(e) => toggleAll(e.target.checked)}
            disabled={addableIds.length === 0}
            className="w-5 h-5 rounded border-outline text-primary focus:ring-primary"
          />
          <span className="text-label-md text-on-surface">
            전체 선택 ({checked.size}/{addableIds.length})
          </span>
        </label>
        <button
          type="button"
          onClick={handleAddSelected}
          disabled={checked.size === 0 || isBulkPending}
          className="px-4 py-2 rounded-lg bg-primary text-on-primary text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          선택 상품 장바구니 담기
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter">
        {optimisticProducts.map((product) => {
          const soldOut = isSoldOut(product);
          const cardPending = cardPendingIds.has(product.id);

          return (
            <ProductCardBase
              key={product.id}
              product={product}
              imageOverlay={
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemove(product.id);
                  }}
                  className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
                  aria-label="찜 해제"
                >
                  <span className="material-symbols-outlined text-[20px]! text-primary-container icon-fill">
                    favorite
                  </span>
                </button>
              }
            >
              <div className="mt-3 md:px-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  aria-label="상품 선택"
                  checked={checked.has(product.id)}
                  onChange={() => !soldOut && toggleOne(product.id)}
                  disabled={soldOut}
                  className="w-5 h-5 shrink-0 rounded border-outline text-primary focus:ring-primary disabled:opacity-40"
                />
                <button
                  type="button"
                  onClick={() => handleAddOne(product.id)}
                  disabled={soldOut || cardPending}
                  className="flex-1 py-2.5 rounded-lg border border-outline-variant text-on-surface text-label-md flex justify-center items-center gap-1.5 hover:bg-surface-container-low active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  <span className="material-symbols-outlined text-[18px]!">shopping_cart</span>
                  {soldOut ? '품절' : cardPending ? '담는 중...' : '장바구니 담기'}
                </button>
              </div>
            </ProductCardBase>
          );
        })}
      </div>
    </>
  );
}
