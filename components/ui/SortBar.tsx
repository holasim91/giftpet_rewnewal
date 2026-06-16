'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { SortOption } from '@/types';

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: 'recommended', label: '추천순' },
  { key: 'newest', label: '신상순' },
  { key: 'price_asc', label: '낮은가격순' },
  { key: 'price_desc', label: '높은가격순' },
];

export default function SortBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = (searchParams.get('sort') as SortOption) ?? 'recommended';

  const setSort = (key: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', key);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {/* Desktop: 텍스트 버튼 */}
      <div className="hidden md:flex gap-6 text-sm text-secondary">
        {SORT_OPTIONS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setSort(key)}
            className={`transition-colors hover:text-primary ${
              current === key ? 'font-semibold text-on-background' : ''
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Mobile: 칩 */}
      <div className="md:hidden flex gap-4 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {SORT_OPTIONS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setSort(key)}
            className={`text-label-md whitespace-nowrap transition-colors ${
              current === key ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
