'use client';

interface Props {
  value: number;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

const SIZE = { sm: 'text-[16px]', md: 'text-[22px]', lg: 'text-[28px]' };

export default function StarRating({ value, onChange, size = 'md', readonly = false }: Props) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`material-symbols-outlined leading-none transition-colors ${SIZE[size]} ${
            readonly ? 'cursor-default' : 'cursor-pointer hover:text-primary-container'
          } ${star <= value ? 'text-primary-container icon-fill' : 'text-surface-container-high'}`}
          aria-label={`별점 ${star}점`}
        >
          star
        </button>
      ))}
    </div>
  );
}
