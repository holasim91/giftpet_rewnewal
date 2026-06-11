import type { Product } from '@/types';

export const BADGE_STYLES = {
  BEST: 'bg-[#4E7CAE] text-white',
  NEW: 'bg-primary-container text-on-primary',
  SOLD_OUT: 'bg-inverse-surface text-inverse-on-surface',
} as const;

// 카드 좌측 상태 배지: BEST > NEW 우선순위
export function getLeftBadge(product: Product): 'BEST' | 'NEW' | null {
  if (product.badges.includes('BEST')) return 'BEST';
  if (product.badges.includes('NEW')) return 'NEW';
  return null;
}

// 카드 우측 상태 배지: stock===0일 때만 "품절"
export function getRightBadge(product: Product): string | null {
  return product.stock === 0 ? 'SOLD OUT' : null;
}
