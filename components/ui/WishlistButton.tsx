'use client';

import { useWishlist } from '@/components/wishlist/WishlistProvider';

interface Props {
  productId: string;
  className?: string; // 래퍼 위치/배경 스타일
  iconClassName?: string; // 아이콘 크기 (기본 text-[20px])
}

export default function WishlistButton({
  productId,
  className = '',
  iconClassName = 'text-[20px]',
}: Props) {
  const { isWishlisted, toggle } = useWishlist();
  const active = isWishlisted(productId);

  const handleClick = (e: React.MouseEvent) => {
    // 카드가 <Link>로 감싸진 경우 네비게이션 방지
    e.preventDefault();
    e.stopPropagation();
    toggle(productId);
  };

  return (
    <div
      role="button"
      aria-label={active ? '찜 해제' : '찜하기'}
      aria-pressed={active}
      onClick={handleClick}
      className={[
        'cursor-pointer transition-colors',
        active ? 'text-primary-container' : 'text-on-surface-variant hover:text-primary-container',
        className,
      ].join(' ')}
    >
      <span className={['material-symbols-outlined', iconClassName, active ? 'icon-fill' : ''].join(' ')}>
        favorite
      </span>
    </div>
  );
}
