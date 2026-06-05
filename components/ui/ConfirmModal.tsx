'use client';

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  message,
  confirmLabel = '삭제',
  cancelLabel = '취소',
  isPending = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onCancel}
        className={[
          'fixed inset-0 bg-black/40 z-[9990]',
          'transition-opacity duration-200',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="삭제 확인"
        className={[
          'fixed inset-0 z-[9991] flex items-center justify-center px-6',
          'pointer-events-none',
        ].join(' ')}
      >
        <div
          className={[
            'w-full max-w-sm bg-surface-container-lowest rounded-2xl p-8',
            'shadow-[0px_10px_30px_rgba(0,0,0,0.12)]',
            'transition-all duration-200',
            isOpen
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none',
          ].join(' ')}
        >
          <h2 className="text-headline-sm font-bold text-on-surface mb-3">삭제 확인</h2>
          <p className="text-body-md text-secondary mb-8">{message}</p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isPending}
              className="flex-1 py-3 border border-outline-variant rounded-lg text-label-md text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-40"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isPending}
              className="flex-1 py-3 bg-error text-on-error rounded-lg text-label-md hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {isPending ? '처리 중...' : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
