'use client';

export interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  disabled?: boolean;
  compact?: boolean;
}

export default function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
  disabled = false,
  compact = false,
}: QuantityControlProps) {
  if (compact) {
    return (
      <div className="flex items-center border border-outline-variant rounded-lg bg-surface-container-lowest overflow-hidden">
        <button
          type="button"
          onClick={onDecrease}
          disabled={disabled || quantity <= 1}
          className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined text-label-md">remove</span>
        </button>
        <span className="w-8 text-center text-label-md font-bold">{quantity}</span>
        <button
          type="button"
          onClick={onIncrease}
          disabled={disabled}
          className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined text-label-md">add</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center border border-outline-variant rounded-full px-2 py-1">
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled || quantity <= 1}
        className="w-8 h-8 flex items-center justify-center hover:bg-surface-container rounded-full transition-colors"
      >
        <span className="material-symbols-outlined text-sm">remove</span>
      </button>
      <span className="w-10 text-center text-body-md font-medium">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled}
        className="w-8 h-8 flex items-center justify-center hover:bg-surface-container rounded-full transition-colors"
      >
        <span className="material-symbols-outlined text-sm">add</span>
      </button>
    </div>
  );
}
