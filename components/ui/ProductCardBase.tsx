import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { PRODUCT_CATEGORY_LABELS } from '@/types';
import { getLeftBadge, getRightBadge, BADGE_STYLES } from '@/lib/badge';

interface ProductCardBaseProps {
  product: Product;
  children?: React.ReactNode;
  showQuickAdd?: boolean;
}

export default function ProductCardBase({ product, children, showQuickAdd = false }: ProductCardBaseProps) {
  const isDiscontinued = !product.isActive;
  const isSoldByStock = product.stock === 0;
  const soldOut = isDiscontinued || isSoldByStock;

  const leftBadge = getLeftBadge(product);
  const rightBadge = getRightBadge(product);

  const quickAddLabel = isDiscontinued ? '판매종료' : isSoldByStock ? '품절' : 'Add to Cart';

  return (
    <div className={soldOut ? 'opacity-60' : ''}>
      <Link href={`/shop/product/${product.id}`} className="group block">
        {/* Image container */}
        <div className="relative w-full aspect-square md:aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)] group-hover:-translate-y-1 group-hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />

          {/* 상단: 좌측 배지 + 우측 품절 배지 */}
          <div className="absolute top-2 left-2 right-2 md:top-3 md:left-3 md:right-3 z-10 flex justify-between items-center">
            <div>
              {leftBadge && (
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${BADGE_STYLES[leftBadge]}`}>
                  {leftBadge}
                </span>
              )}
            </div>
            <div>
              {rightBadge && (
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${BADGE_STYLES.SOLD_OUT}`}>
                  {rightBadge}
                </span>
              )}
            </div>
          </div>

          {/* Quick Add (ProductGrid 전용) */}
          {showQuickAdd && (
            <div className="hidden md:block absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className={`w-full py-3 rounded-lg font-medium text-sm flex justify-center items-center gap-2 shadow-md ${soldOut ? 'bg-surface-container text-tertiary cursor-not-allowed' : 'bg-primary text-white cursor-pointer'}`}>
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                {quickAddLabel}
              </div>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="mt-3 space-y-1 md:p-4 md:mt-0">
          <p className="text-label-sm text-on-surface-variant">{PRODUCT_CATEGORY_LABELS[product.productCategory]}</p>
          <h3 className="text-body-md text-on-surface line-clamp-2 overflow-hidden text-ellipsis leading-snug">
            {product.name}
          </h3>
          <p className="text-headline-sm text-on-surface font-bold mt-2">
            {product.price.toLocaleString()}원
          </p>
        </div>
      </Link>

      {children}
    </div>
  );
}
